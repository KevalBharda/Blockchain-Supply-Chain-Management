import { createContext, useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import tracking from "../artifacts/contracts/Tracking.sol/Tracking.json";
const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

// FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = createContext();

export const TrackingProvider = ({ children }) => {
  const DappName = "Product Tracking dapp";

  const [currentUser, setCurrentUser]   = useState("wallet_address_here");
  const [walletBalance, setWalletBalance] = useState("0"); // ✅ NEW

  /* ------------------------------------------------------------------ */
  /*                        🔌  WALLET HELPERS                           */
  /* ------------------------------------------------------------------ */

  // fetch balance for a given address and save to state
  const fetchBalance = async (account) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balanceWei = await provider.getBalance(account);
      const balanceEth = ethers.utils.formatEther(balanceWei);
      setWalletBalance(parseFloat(balanceEth).toFixed(4)); // keep 4 decimals
    } catch (err) {
      console.log("Error fetching balance:", err);
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentUser(accounts[0]);
        fetchBalance(accounts[0]);             // ✅ also grab balance
      } else {
        setCurrentUser("");
        setWalletBalance("");
        return "No account found";
      }
    } catch (error) {
      return "Not connected";
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
      fetchBalance(accounts[0]);               // ✅ also grab balance
    } catch (error) {
      return "Something went wrong";
    }
  };

  /* ------------------------------------------------------------------ */
  /*                   🚚  SHIPMENT FUNCTIONS (UNCHANGED)                */
  /* ------------------------------------------------------------------ */

  const createShipment = async (items) => {
    const { receiver, pickupTime, distance, price } = items;
    try {
      const web3Modal   = new Web3Modal();
      const connection  = await web3Modal.connect();
      const provider    = new ethers.providers.Web3Provider(connection);
      const signer      = provider.getSigner();
      const contract    = fetchContract(signer);

      const tx = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price, 18),
        { value: ethers.utils.parseUnits(price, 18) }
      );
      await tx.wait();
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  const getAllShipment = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);

      const shipments = await contract.getAllTransactions();
      return shipments.map((s) => ({
        sender:       s.sender,
        receiver:     s.receiver,
        price:        ethers.utils.formatEther(s.price.toString()),
        pickupTime:   s.pickupTime.toNumber(),
        deliveryTime: s.deliveryTime.toNumber(),
        distance:     s.distance.toNumber(),
        isPaid:       s.isPaid,
        status:       s.status,
      }));
    } catch (error) {
      console.log("Error getting shipments:", error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const count    = await contract.getShipmentsCount(accounts[0]);
      return count.toNumber();
    } catch (error) {
      console.log("Error getting shipment count:", error);
    }
  };

  const completeShipment = async ({ receiver, index }) => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      const web3Modal  = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider   = new ethers.providers.Web3Provider(connection);
      const signer     = provider.getSigner();
      const contract   = fetchContract(signer);

      const tx = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        { gasLimit: 300000 }
      );
      await tx.wait();
    } catch (error) {
      console.log("Error completing shipment:", error);
    }
  };

  const getShipment = async (index) => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const s        = await contract.getShipment(accounts[0], index);

      return {
        sender:       s[0],
        receiver:     s[1],
        pickupTime:   s[2].toNumber(),
        deliveryTime: s[3].toNumber(),
        distance:     s[4].toNumber(),
        price:        ethers.utils.formatEther(s[5].toString()),
        status:       s[6],
        isPaid:       s[7],
      };
    } catch (error) {
      console.log("Error getting shipment:", error);
    }
  };

  const startShipment = async ({ receiver, index }) => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts   = await window.ethereum.request({ method: "eth_accounts" });

      const web3Modal  = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider   = new ethers.providers.Web3Provider(connection);
      const signer     = provider.getSigner();
      const contract   = fetchContract(signer);

      const tx = await contract.startShipment(accounts[0], receiver, index);
      await tx.wait();
    } catch (error) {
      console.log("Error starting shipment:", error);
    }
  };

  /* ------------------------------------------------------------------ */
  /*                       🔁  LIFECYCLE & EVENTS                        */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    checkIfWalletConnected();

    // Refresh info when user switches accounts in MetaMask
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          setCurrentUser(accounts[0]);
          fetchBalance(accounts[0]);
        } else {
          setCurrentUser("");
          setWalletBalance("");
        }
      });
    }
  }, []);

  /* ------------------------------------------------------------------ */
  /*                            PROVIDER                                 */
  /* ------------------------------------------------------------------ */

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
        walletBalance,          // ✅ EXPOSE BALANCE
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

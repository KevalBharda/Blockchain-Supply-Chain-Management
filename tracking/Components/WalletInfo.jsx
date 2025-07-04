// components/WalletInfo.jsx
import { useContext } from "react";
import { TrackingContext } from "../Context/TrackingContext";

const WalletInfo = () => {
    const context = useContext(TrackingContext);
    console.log("👀 WalletInfo Context:", context);
    const { currentUser, walletBalance } = context || {};

  return (
    <div className="p-4 mb-4 rounded-lg shadow-md bg-white text-gray-800 border border-gray-200">
      <h2 className="text-lg font-semibold mb-1">🦊 Wallet Info</h2>
      <p><strong>Address:</strong> {currentUser || "Not connected"}</p>
      <p><strong>Balance:</strong> {walletBalance ? `${walletBalance} ETH` : "—"}</p>
    </div>
  );
};

export default WalletInfo;

import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Str1 } from "../Components/index";

// INTERNAL IMPORT
import images from "../Images/index";
import WalletInfo from "../Components/WalletInfo";
import { TrackingContext } from "../Context/TrackingContext"; // ✅ context import

export default ({ openProfile, setOpenProfile }) => {
  const { getShipmentsCount, currentUser } = useContext(TrackingContext); // ✅ from context
  const [count, setCount] = useState();
  const context = useContext(TrackingContext);
console.log("TrackingContext value:", context);


  useEffect(() => {
    const getShipmentsData = async () => {
      const allData = await getShipmentsCount();
      setCount(allData);

    };
    getShipmentsData();
  }, []);

  return openProfile ? (
    <div className="fixed inset-0 z-10 overflow-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setOpenProfile(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setOpenProfile(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <div className="flex flex-col items-center pb-10">
              <Image
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={images.avatar}
                alt="Bonnie Image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Welcome Trader
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentUser}
              </span>

              <div className="flex mt-4 space-x-4 md:mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-cente text-black
                   rounded-lg border-2"
                >
                  <WalletInfo />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black
                  rounded-lg border-2"
                >
                  Total Shipment: {count}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

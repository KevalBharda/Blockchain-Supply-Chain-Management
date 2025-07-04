import { useState } from "react";
import { Str1 } from "../Components/index";

export default ({
  setCreateShipmentModel,
  createShipmentModel,
  createShipment,
}) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
  });

  const createItem = async () => {
    try {
      console.log("Submitted shipment:", shipment);
      await createShipment(shipment);
      setShipment({
        receiver: "",
        pickupTime: "",
        distance: "",
        price: "",
      }); // ✅ Reset form values
      setCreateShipmentModel(false); // ✅ Close modal
      window.location.reload(); // 🔄 Optional: uncomment to fully reload page
    } catch (error) {
      console.log("Wrong Creating Item", error);
    }
  };

  return createShipmentModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setCreateShipmentModel(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setCreateShipmentModel(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">
              Track Product, Create Shipment
            </h4>
            <p className="text-[15px] text-gray-600">
              For indeed, no one practices strenuous effort unless they expect
              some benefit from it.
            </p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="receiver"
                  value={shipment.receiver}
                  className="w-full pl-5 py-2 text-gray-500 bg-transparent outline-none border 
                  focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="date"
                  placeholder="pickupTime"
                  value={shipment.pickupTime}
                  className="w-full pl-5 py-2 text-gray-500 bg-transparent outline-none border 
                  focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      pickupTime: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="distance"
                  value={shipment.distance}
                  className="w-full pl-5 py-2 text-gray-500 bg-transparent outline-none border 
                  focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      distance: e.target.value,
                    })
                  }
                />
              </div>
              <div className="relative mt-3">
                <input
                  type="text"
                  placeholder="price"
                  value={shipment.price}
                  className="w-full pl-5 py-2 text-gray-500 bg-transparent outline-none border 
                  focus:border-indigo-600 shadow-sm rounded-lg"
                  onChange={(e) =>
                    setShipment({
                      ...shipment,
                      price: e.target.value,
                    })
                  }
                />
              </div>

              <button
                onClick={createItem}
                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white 
                bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 
                ring-indigo-600 focus:ring-2"
              >
                Create Shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

import React, {useState, useEffect, useContext} from "react";

//INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
} from "../Components/index";
import { TrackingContext } from "../Context/TrackingContext";

const index = () => {
  const{
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  //STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModel, setStartModel] = useState(false);
  const [completeModel, setCompleteModel] = useState(false);
  const [getModel, setGetModel] = useState(false);

  //DATA STATE
  const [allShipmentsdata, setallShipmentsdata] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setallShipmentsdata(allData);
    };
  }, []);

  return (
    <>
    <Services
      setOpenProfile={setOpenProfile}
      setCompleteModel={setCompleteModel}
      setGetModel={setGetModel}
      setStartModel={setStartModel}
    />

    <Table
      setCreateShipmentModel={setCreateShipmentModel}
      allShipmentsdata={allShipmentsdata}
    />

    <Form 
      createShipmentModel={createShipmentModel}
      createShipment={createShipment}
      setCreateShipmentModel={setCreateShipmentModel}
    />

    <Profile
      openProfile={openProfile}
      setOpenProfile={setOpenProfile}
      currentUser={currentUser}
      getShipmentCount={getShipmentsCount}
    />

    <CompleteShipment
      completeModel={completeModel}
      setCompleteModel={setCompleteModel}
      completeShipment={completeShipment}
    />

    <GetShipment
      getModel={getModel}
      setGetModel={setGetModel}
      getShipment={getShipment}
    />

    <StartShipment
      startModel={startModel}
      setStartModel={setStartModel}
      startShipment={startShipment}
    />
    </>
  );
};

export default index;
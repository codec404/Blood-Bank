import React, { useEffect, useState } from "react";
import Header from "../../components/Shared/Layout/Header";
import API from "../../services/API";

const Analytics = () => {
  const [data, setData] = useState([]);
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/blood-groups-data");
      if (data?.success) {
        console.log(data.bloodGroupData);
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBloodGroupData();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record) => (<div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>))}
      </div>
    </>
  );
};

export default Analytics;

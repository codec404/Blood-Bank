import React, { useEffect, useState } from "react";
import Header from "../../components/Shared/Layout/Header";
import API from "../../services/API";
import moment from "moment";
import "../../styles/Table.css"

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#EA906C",
    "#C21292",
    "#EF4040",
    "#FFA732",
    "#67729D",
    "#29ADB2",
    "#AF2655",
    "#7071E8",
  ];
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/blood-groups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
      // else
    } catch (error) {
      console.log(error);
    }
  };

  //Lifecycle Hook
  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center mt-4">
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i]}` }}
          >
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3">
                {record.bloodGroup}
              </h1>
              <p className="card-text">
                Total In : <b>{record.totalIn}</b> (ML)
              </p>
              <p className="card-text">
                Total Out : <b>{record.totalOut}</b> (ML)
              </p>
            </div>
            <div className="card-footer bg-dark text-light text-center">
              Total Available : <b>{record.availableBlood}</b> (ML)
            </div>
          </div>
        ))}
      </div>
      <div className="container mt-3">
        <h1 className="my-3">Recent Blood Transfusions</h1>
        <hr />
        <table className="table-striped" id="table-content">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donor Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity} (ML)</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;

import React, { useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { useSelector } from "react-redux";
import "../../styles/Table.css"

const Donor = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  //FIND DONOR RECORDS
  const getDonors = async () => {
    try {
      const { data } = await API.post(
        "/inventory/get-hospital-inventory-data",
        {
          filters: {
            inventoryType: "in",
            donor: user?._id,
          },
        }
      );
      console.log(data);
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonors();
  }, []);
  return (
    <Layout>
      {/* <h1>Donor Page</h1> */}
      <div className="container mt-4">
        <table className="table-striped" id="table-content">
          <thead>
            <tr>
              <th scope="col">Blood Group</th>
              <th scope="col">Inventory Type</th>
              <th scope="col">Quanity</th>
              <th scope="col">Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.bloodGroup}</td>
                <td>{record.inventoryType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donor;

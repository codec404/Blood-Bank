import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Shared/Spinner";
import Layout from "../components/Shared/Layout/Layout";
import Modal from "../components/Shared/Modal/Modal";
import API from "../services/API";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "../styles/Table.css";

const Homepage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //GET function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory-data");
      if (data?.success) {
        setData(data?.inventory);
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
    <Layout>
      {user?.role === "Admin" && navigate("/admin")}
      {user?.role === "Donor" && navigate("/organization")}
      {user?.role === "Hospital" && navigate("/organization")}
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="container">
            <h4
              className="ms-2 mt-1 d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success py-4 mx-2"></i>
              Add Inventory
            </h4>
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
                {data.map((record) => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity} (ML)</td>
                    <td>{record.email}</td>
                    <td>
                      {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal />
          </div>
        </>
      )}
    </Layout>
  );
};

export default Homepage;

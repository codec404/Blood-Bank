import React, { useEffect, useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";

const Organization = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  //FIND ORGANIZATION RECORDS
  const getOrganizations = async () => {
    try {
      if (user?.role === "Donor") {
        const { data } = await API.get("/inventory/get-organization-data");
        // console.log(data);
        if (data?.success) {
          setData(data?.organizations);
        }
      } else if (user?.role === "Hospital") {
        const { data } = await API.get(
          "/inventory/get-organization-for-hospital"
        );
        // console.log(data);
        if (data?.success) {
          setData(data?.organizations);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizations();
  }, [user]);
  return (
    <Layout>
      {/* <h1>Donor Page</h1> */}
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Organization Name</th>
              <th scope="col">Email ID</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.organizationName}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.address}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Organization;

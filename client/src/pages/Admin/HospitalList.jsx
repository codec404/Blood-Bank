import React, { useEffect, useState } from 'react'
import Layout from '../../components/Shared/Layout/Layout'
import moment from 'moment';
import API from '../../services/API';

const HospitalList = () => {
  const [data, setData] = useState([]);
  //DELETE
  const removeEntry = async (id) => {
    try {
      let ans = window.prompt(
        "Are you sure you want to delete the hospital data?",
        "Sure"
      );
      if (!ans) {
        return;
      }
      const { data } = await API.delete(`/admin/delete-hospital/${id}`);
      alert(`${data?.message}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //FIND DONOR RECORDS
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/admin/get-hospital-list");
      // console.log(data);
      if (data?.success) {
        setData(data?.hospitalData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHospitals();
  }, []);
  return (
    <Layout>
      {/* <h1>Donor Page</h1> */}
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email ID</th>
              <th scope="col">Phone</th>
              <th scope="col">Address</th>
              <th scope="col">Time & Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.hospitalName}</td>
                <td>{record.email}</td>
                <td>{record.phone}</td>
                <td>{record.address}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                <td><div className="btn btn-danger" onClick = {() => removeEntry(record._id)}>Delete</div></td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default HospitalList

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UserDetail() {
  const [data, setData] = useState();
  const { id } = useParams();
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        axios
          .get(`https://jsonplaceholder.typicode.com/users/${id}`, {
            // headers: {
            //   Authorization: `Bearer ${userDataSess.jwtToken}`, // Send the token in the Authorization header
            // },
          })
          .then((response) => {
            console.log(response.data);
            setData(data);
            setUserData(data);
          });
      } catch (error) {
        toast.error("Network Error");
      }
    };

    getData();
  }, []);

  return (
    <div>
      <Header style={{ backgroundColor: "#dee2e6" }} />

      {data ? (
        <div className="user-details-form">
          <center>
            <h2>User Details</h2>
          </center>

          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={userData.username}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={userData.email}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={userData.phone}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="text"
                className="form-control"
                id="website"
                value={userData.website}
                readOnly
              />
            </div>
          </form>
        </div>
      ) : null}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Footer />
    </div>
  );
}

export default UserDetail;

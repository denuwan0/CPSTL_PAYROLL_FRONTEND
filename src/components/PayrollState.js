import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PayrollState() {
  const userDataFromStorage = sessionStorage.getItem("userData");

  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${userDataSess.jwtToken}`,
      ContentType: "application / json",
    },
  };

  const [controlDetailData, setControlDetailData] = useState([]);

  useEffect(() => {
    try {
      axios
        .get("http://13.233.230.0/api/Payroll/get-payrun", config)
        .then((response) => {
          var data = null;
          data = JSON.parse(response.data.data);
          console.log(data);
          setControlDetailData(data);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }, []);

  return (
    <div>
      <Header style={{ backgroundColor: "#dee2e6" }} />
      <Footer />
    </div>
  );
}

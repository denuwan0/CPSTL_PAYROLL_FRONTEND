import React from "react";
import {
  Table,
  Container,
  Button,
  Badge,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Process from "./Process";
import "./ScrollableTable.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersonPlusFill, EyeFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function ProcessFlow() {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;

  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${userDataSess.jwtToken}`,
      ContentType: "application / json",
    },
  };

  console.log(userDataSess);

  const [userDetails, setUserDetails] = useState({
    period: 202310,
    companyCode: 3000,
    approvedBy: userDataSess._userDetails.epf,
  });

  //var payrollData = [];
  const [payrollData, setPayrollData] = useState([]);
  //console.log(payrollSaplData);
  //console.log(payrollNonSaplData);
  const handleConfirmBtn = () => {
    // Make an API call when the button is clicked
    axios
      .post(
        "http://13.233.230.0/api/DataTransfer/ConfirmDataTransfer",
        config,
        userDetails
      )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(error);
      });
  };

  const handleRejectBtn = () => {
    // Make an API call when the button is clicked
    axios
      .post(
        "http://13.233.230.0//api/DataTransfer/temp-data-rollback",
        config,
        userDetails
      )
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error(error);
      });
  };

  useEffect(() => {
    //console.log(userDataSess);
    //console.log(userDataSess.jwtToken);

    try {
      axios
        .get("http://13.233.230.0/api/DataTransfer/GetDataTransferStatistics", {
          params: {
            companyCode: "3000",
            period: "202310",
          },
          headers: {
            config,
          },
        })
        .then((response) => {
          var data = null;

          data = JSON.parse(response.data.data);

          const payrollDataArr = [];

          {
            data[0].SAPPayData.map((item, index) => {
              //console.log(item),
              var matched = false; //"";
              var sapAmount = item.Amount ? item.Amount : 0;
              var nonSapAmount = parseFloat(0);
              var nonSapPayCode = parseFloat(0);
              var nonSapLineCount = parseFloat(0);

              //console.log(typeof data[0].nonSAPPayData[index]);

              if (typeof data[0].nonSAPPayData[index] != "undefined") {
                nonSapPayCode = data[0].nonSAPPayData[index].PayCode;
                nonSapAmount = data[0].nonSAPPayData[index].Amount;
                nonSapLineCount = data[0].nonSAPPayData[index].Line_Item_Count;

                if (
                  item.PayCode === nonSapPayCode &&
                  item.Line_Item_Count === nonSapLineCount &&
                  sapAmount == nonSapAmount
                ) {
                  matched = true;
                } else {
                  matched = false;
                }
              } else {
                nonSapAmount = parseFloat(0);

                matched = false;
              }

              //console.log(nonSapAmount);

              if (!payrollData.includes(item.PayCode)) {
                payrollDataArr.push({
                  sapPayCode: item.PayCode,
                  sapAmount: parseFloat(item.Amount),
                  sapLineCount: item.Line_Item_Count,
                  nonSapPayCode:
                    nonSapPayCode == 0 ? item.PayCode : nonSapPayCode,
                  nonSapAmount: parseFloat(nonSapAmount),
                  nonSapLineCount: nonSapLineCount,
                  status: matched,
                });
              }
            });
          }

          setPayrollData(payrollDataArr);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }, []);

  return (
    <div>
      <Header style={{ backgroundColor: "#dee2e6" }} />
      <Container className="mt-5 ">
        <Row className="mb-2 ">
          <Col>
            <Process />
          </Col>
        </Row>
      </Container>
      <Footer />
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
    </div>
  );
}

export default ProcessFlow;

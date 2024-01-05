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
import "./ScrollableTable.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersonPlusFill, EyeFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function ControlDetail() {
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

  const [controlDetailData, setControlDetailData] = useState([]);

  // const controlDetailData = [
  //   {
  //     epf: 108995,
  //     grossForEpf: 123465,
  //     epfAmount: 23735,
  //     etfAmount: 52333,
  //     grossForTax: 20000,
  //     taxAmount: 25000,
  //   },
  //   {
  //     epf: 112683,
  //     grossForEpf: 123465,
  //     epfAmount: 23735,
  //     etfAmount: 52333,
  //     grossForTax: 20000,
  //     taxAmount: 25000,
  //   },
  //   {
  //     epf: 114392,
  //     grossForEpf: 123465,
  //     epfAmount: 23735,
  //     etfAmount: 52333,
  //     grossForTax: 20000,
  //     taxAmount: 25000,
  //   },
  //   {
  //     epf: 114396,
  //     grossForEpf: 123465,
  //     epfAmount: 23735,
  //     etfAmount: 52333,
  //     grossForTax: 20000,
  //     taxAmount: 25000,
  //   },
  //   {
  //     epf: 116735,
  //     grossForEpf: 123465,
  //     epfAmount: 23735,
  //     etfAmount: 52333,
  //     grossForTax: 20000,
  //     taxAmount: 25000,
  //   },
  // ];

  //console.log(controlDetailData);

  useEffect(() => {
    try {
      axios
        .get("http://13.233.230.0/api/Payroll/get-payroll-summary", {
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
      <Container className="mt-5 ">
        <Row className="mb-2 ">
          <Col>
            <Card style={{ backgroundColor: "#c1dcef" }}>
              <Card.Body>
                <Row>
                  <Col md={12}>
                    <Card.Title>Control Details</Card.Title>
                    <Card.Text></Card.Text>
                  </Col>
                  <Col md={3}></Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="table-wrapper">
          <Col md={12}>
            <Card style={{ backgroundColor: "#c1dcef" }}>
              <Card.Body>
                <Table className="table">
                  <thead className="thead-fixed">
                    <tr>
                      <th>#</th>
                      <th style={{ textAlign: "center" }}>Epf</th>
                      <th style={{ textAlign: "center" }}>Gross for EPF</th>
                      <th style={{ textAlign: "center" }}>EPF Amount</th>
                      <th style={{ textAlign: "center" }}>ETF Amount</th>
                      <th style={{ textAlign: "center" }}>Gross for Tax</th>
                      <th style={{ textAlign: "center" }}>Tax Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {controlDetailData.map((item, index) => (
                      <tr key={index}>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.epf}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.epfGross}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.emp_contribution}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.etf}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.taxableGross}
                        </td>
                        <td
                          className="table-data"
                          style={{ textAlign: "right" }}
                        >
                          {item.tax}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Card.Text></Card.Text>
              </Card.Body>
            </Card>
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

export default ControlDetail;

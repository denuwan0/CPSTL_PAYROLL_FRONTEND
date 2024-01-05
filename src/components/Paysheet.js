import React from "react";
import { Table, Container, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./ScrollableTable.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Paysheet() {
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

  const [deductionData1, setDeductionData] = useState([]);
  const [empData1, setEmpData] = useState([]);
  const [earningData1, setEarningData] = useState([]);
  const [salData1, setSalData] = useState([]);
  const [unRecoveredData1, setUnRecoveredData] = useState([]);

  //console.log(empData);

  useEffect(() => {
    try {
      axios
        .get("http://13.233.230.0/api/Payroll/get-paysheet", {
          params: {
            epf: "17534",
            period: "202310",
          },
          headers: {
            config,
          },
        })
        .then((response) => {
          var data = null;
          data = JSON.parse(response.data.data);
          console.log(data[0].empData);
          console.log(data[0].earningData);
          setDeductionData(JSON.parse(data[0].deductionData));
          setEarningData(JSON.parse(data[0].earningData));
          setEmpData(JSON.parse(data[0].empData));
          setSalData(JSON.parse(data[0].salData));
          setUnRecoveredData(JSON.parse(data[0].unRecoveredData));
          console.log(salData1);
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
                    <Card.Title>Employee Paysheet</Card.Title>
                    <Card.Text></Card.Text>
                  </Col>
                  <Col md={3}></Col>
                </Row>
                <Row>
                  <Col md={2}>Epf: {empData1.epf}</Col>
                  <Col md={2}>Name: {empData1.empName}</Col>
                  <Col md={1}>Grade: {empData1.empGrade}</Col>
                  <Col md={2}>Location: {empData1.costCenter}</Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="table-wrapper">
          <Col>
            <Card style={{ backgroundColor: "#c1dcef" }}>
              <Row>
                <Col md={4}>
                  <Card style={{ backgroundColor: "#c1dcef" }}>
                    <Card.Body>
                      <Card.Title>Earning</Card.Title>
                      <Table className="table">
                        <tbody>
                          {earningData1.map((item, index) => (
                            <tr key={index}>
                              <td>{item.payCode}</td>
                              <td>{item.name}</td>
                              <td style={{ textAlign: "right" }}>
                                {item.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card style={{ backgroundColor: "#c1dcef" }}>
                    <Card.Body>
                      <Card.Title>Deduction</Card.Title>
                      <Table className="table">
                        <tbody>
                          {deductionData1.map((item, index) => (
                            <tr key={index}>
                              <td>{item.payCode}</td>
                              <td>{item.name}</td>
                              <td style={{ textAlign: "right" }}>
                                {item.amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card style={{ backgroundColor: "#c1dcef" }}>
                    <Card.Body>
                      <Card.Title>Other</Card.Title>
                      <Table className="table">
                        <tbody>
                          <tr>
                            <td>Gross Salary</td>
                            <td style={{ textAlign: "right" }}>
                              {empData1.epf}
                            </td>
                          </tr>
                          <tr>
                            <td>Deductions</td>
                            <td style={{ textAlign: "right" }}>
                              {empData1.epf}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ color: "red" }}>Unrecovered</td>
                            <td style={{ textAlign: "right", color: "red" }}>
                              {empData1.epf}
                            </td>
                          </tr>
                          <tr>
                            <td>EPF Corp</td>
                            <td style={{ textAlign: "right" }}>
                              {empData1.epf}
                            </td>
                          </tr>
                          <tr>
                            <td>EPF Tot</td>
                            <td style={{ textAlign: "right" }}>
                              {empData1.epf}
                            </td>
                          </tr>
                          <tr>
                            <td>ETF</td>
                            <td style={{ textAlign: "right" }}>
                              {empData1.epf}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Card.Body></Card.Body>
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

export default Paysheet;

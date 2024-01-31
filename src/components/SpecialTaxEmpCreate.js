import React, { useState } from "react";
import {
  Form,
  Table,
  Container,
  Button,
  Row,
  Card,
  Col,
} from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersonPlusFill, FilePostFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./ScrollableTable.css";

const SpecialTaxEmpCreate = () => {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;
  const navigate = useNavigate();

  const [spTaxDetails, setSpTaxDetails] = useState({
    epf: "",
    companyCode: "",
    payCode: "",
    costCenter: "",
    calCode: "",
    rate: "",
    createdBy: userDataSess._userDetails.epf,
  });

  console.log(userDataSess);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSpTaxDetails({ spTaxDetails, [name]: value.toString() });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userDataSess.jwtToken);

    const config = {
      headers: {
        Authorization: `Bearer ${userDataSess.jwtToken}`,
        ContentType: "application / json",
      },
    };

    if (
      spTaxDetails.epf !== "" &&
      spTaxDetails.companyCode !== "" &&
      spTaxDetails.payCode !== "" &&
      spTaxDetails.costCenter !== "" &&
      spTaxDetails.calCode !== "" &&
      spTaxDetails.rate !== "" &&
      spTaxDetails.createdBy !== ""
    ) {
      axios
        .post(
          "http://13.234.120.62/api/Admin/create-special-tax",
          spTaxDetails,
          config
        )
        .then((response) => {
          toast.success("Data saved successfully!");
          const timeout = setTimeout(() => {
            // Replace '/target-route' with the route you want to redirect to
            navigate("/user");
          }, 3000);
          console.log("User created:", response.data);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
        });
    } else {
      toast.error("Please fill all required feilds!");
    }
  };

  return (
    <div>
      <Header style={{ backgroundColor: "#dee2e6" }} />
      <Container className="mt-5 table-container table-wrapper" md={3}>
        <Row className="mb-2 ">
          <Col>
            <Card style={{ backgroundColor: "#c1dcef" }}>
              <Card.Body>
                <Row>
                  <Col className="col-md-06">
                    <Card.Title>Create Special Tax</Card.Title>
                    <Card.Text></Card.Text>
                  </Col>
                  <Col className="col-md-06">
                    <Button
                      href="/user/create"
                      variant="primary"
                      type="submit"
                      style={{ float: "right" }}
                      onClick={handleSubmit}
                    >
                      <i>
                        <FilePostFill /> Save
                      </i>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Form onSubmit={handleFormSubmit} className="md-6">
          <Row>
            <Col md={12}>
              <Card style={{ backgroundColor: "#c1dcef" }}>
                <Card.Body>
                  <Row>
                    <Col md={4} className="mb-2">
                      <Form.Group controlId="costCenter">
                        <Form.Label>Employee EPF</Form.Label>
                        <Form.Select
                          name="epf"
                          value={spTaxDetails.epf}
                          onChange={handleChange}
                        >
                          <option value="">Select Employee EPF</option>
                          <option value="17533">17533</option>
                          <option value="17534">17534</option>
                          <option value="17535">17535</option>
                          <option value="17536">17536</option>
                          {/* Add more options as needed */}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Col className="mb-2">
                        <Form.Group controlId="userID">
                          <Form.Label>Paycode</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Paycode"
                            name="payCode"
                            value={spTaxDetails.payCode}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Col>
                    <Col md={4}>
                      <Col className="mb-2">
                        <Form.Group controlId="epf">
                          <Form.Label>Rate</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Rate"
                            name="rate"
                            value={spTaxDetails.rate}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
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
};

export default SpecialTaxEmpCreate;

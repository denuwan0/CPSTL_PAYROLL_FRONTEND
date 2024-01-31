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

const CreatePaycode = () => {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;
  const navigate = useNavigate();

  const [paycodeDetails, setUserDetails] = useState({
    companyCode: "",
    payCode: "",
    calCode: "",
    description: "",
    isTaxableGross: false,
    rate: "",
    lastUpdateBy: userDataSess._userDetails.epf,
    createdBy: userDataSess._userDetails.epf,
  });

  const handleChange = (e) => {
    console.log(e.target.checked);
    const { name, value } = e.target;

    if (e.target.name == "isTaxableGross") {
      if (e.target.checked == true) {
        setUserDetails({ ...paycodeDetails, [name]: true });
      } else {
        setUserDetails({ ...paycodeDetails, [name]: false });
      }
    } else if (e.target.name == "rate") {
      if (e.target.value) {
        const inputValue = parseFloat(e.target.value);
        if (inputValue < 0 || inputValue == 0) {
          setUserDetails({ ...paycodeDetails, [name]: parseFloat(0) });
        } else if (inputValue > 1 || inputValue == 1) {
          setUserDetails({ ...paycodeDetails, [name]: parseFloat(1) });
        } else {
          setUserDetails({ ...paycodeDetails, [name]: parseFloat(value) });
        }
      }
    } else {
      setUserDetails({ ...paycodeDetails, [name]: value.toString() });
    }

    console.log(paycodeDetails);
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
      paycodeDetails.companyCode !== "" &&
      paycodeDetails.payCode !== "" &&
      paycodeDetails.calCode !== "" &&
      paycodeDetails.description !== "" &&
      paycodeDetails.isTaxableGross !== "" &&
      paycodeDetails.rate !== "" &&
      paycodeDetails.lastUpdateBy !== "" &&
      paycodeDetails.createdBy !== ""
    ) {
      axios
        .post("http://13.234.120.62/api/Admin/create-paycode/", paycodeDetails)
        .then((response) => {
          console.log(response);
          toast.success("Data saved successfully!");
          const timeout = setTimeout(() => {
            // Replace '/target-route' with the route you want to redirect to
            navigate("/PayCode");
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
                    <Card.Title>Create Paycode</Card.Title>
                    <Card.Text></Card.Text>
                  </Col>
                  <Col className="col-md-06">
                    <Button
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
                    <Col md={4}>
                      <Col className="mb-2">
                        <Form.Group controlId="userID">
                          <Form.Label>Paycode</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Paycode"
                            name="payCode"
                            value={paycodeDetails.payCode}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-2">
                        <Form.Group controlId="epf">
                          <Form.Label>Calcode</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Calcode"
                            name="calCode"
                            value={paycodeDetails.calCode}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Col>
                    <Col md={8}>
                      <Row>
                        <Col md={6} className="mb-2">
                          <Form.Group controlId="costCenter">
                            <Form.Label>Company Code</Form.Label>
                            <Form.Select
                              name="companyCode"
                              value={paycodeDetails.companyCode}
                              onChange={handleChange}
                            >
                              <option value="">Select Company</option>
                              <option value="2000">2000</option>
                              <option value="3000">3000</option>
                              {/* Add more options as needed */}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                          <Form.Group controlId="empName">
                            <Form.Label>Rate </Form.Label>
                            <Form.Control
                              type="number"
                              step="any" // Allows float values
                              placeholder="Enter Rate"
                              name="rate"
                              value={paycodeDetails.rate}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="mb-2" md={9}>
                          <Form.Group controlId="empName">
                            <Form.Label>Description </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Description"
                              name="description"
                              value={paycodeDetails.description}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col className="mb-2" md={3}>
                          <Form.Group controlId="empName">
                            <Row className="mt-4">
                              <Col md={2}>
                                <Form.Control
                                  className="form-check-input"
                                  type="checkbox"
                                  name="isTaxableGross"
                                  onChange={handleChange}
                                />
                              </Col>
                              <Col md={6}>
                                <Form.Label>isTaxableGross </Form.Label>
                              </Col>
                            </Row>
                          </Form.Group>
                        </Col>
                      </Row>
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

export default CreatePaycode;

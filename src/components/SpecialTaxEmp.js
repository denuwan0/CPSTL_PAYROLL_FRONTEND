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

const SpecialTaxEmpForm = () => {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    userID: "",
    epf: "",
    empName: "",
    costCenter: "",
    password: "123",
    role: "",
    createdBy: userDataSess._userDetails.epf,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value.toString() });
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
      userDetails.userID !== "" &&
      userDetails.epf !== "" &&
      userDetails.empName !== "" &&
      userDetails.costCenter !== "" &&
      userDetails.password !== "" &&
      userDetails.role !== "" &&
      userDetails.createdBy !== ""
    ) {
      axios
        .post("http://13.233.230.0/api/User/CreateUser/", userDetails, config)
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
                    <Col md={4}>
                      <Col className="mb-2">
                        <Form.Group controlId="userID">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="userID"
                            value={userDetails.userID}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-2">
                        <Form.Group controlId="epf">
                          <Form.Label>Epf</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Epf"
                            name="epf"
                            value={userDetails.epf}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Col>
                    <Col md={8}>
                      <Col className="mb-2">
                        <Form.Group controlId="empName">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="empName"
                            value={userDetails.empName}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Row>
                        <Col md={6} className="mb-2">
                          <Form.Group controlId="costCenter">
                            <Form.Label>Cost Center</Form.Label>
                            <Form.Select
                              name="costCenter"
                              value={userDetails.costCenter}
                              onChange={handleChange}
                            >
                              <option value="">Select Cost Center</option>
                              <option value="C10110">C10110</option>
                              {/* Add more options as needed */}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                          <Form.Group controlId="role">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                              name="role"
                              value={userDetails.role}
                              onChange={handleChange}
                            >
                              <option value="">Select Role</option>
                              <option value="Admin">Admin</option>
                              {/* Add more options as needed */}
                            </Form.Select>
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

export default SpecialTaxEmpForm;

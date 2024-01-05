import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Form,
  Tab,
  Tabs,
} from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userImage from "../images/images.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;

  console.log(userDataSess.jwtToken);

  const [userDetails, setUserDetails] = useState({
    userID: "",
    epf: "",
    empName: "",
    costCenter: "",
    password: "",
    role: "",
    createdBy: userDataSess._userDetails.epf,
  });

  const navigate = useNavigate();
  if (userDataSess == null) {
    navigate("/login");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${userDataSess.jwtToken}`,
    },
  };

  useEffect(() => {
    //console.log(userDataSess);
    console.log(userDataSess.jwtToken);

    try {
      axios
        .get("http://13.233.230.0/api/User/GetUsers", config)
        .then((response) => {
          console.log(response.data);
          response.data.map((item, index) => {
            if (userDataSess.epf == item.epf) {
            }
            console.log(item);
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value.toString() });
  };

  return (
    <div>
      <Header style={{ backgroundColor: "#dee2e6" }} />
      <Container className="mt-4">
        <Row className="mb-2">
          <Col md={4} className="mb-2">
            <Card className="mb-2">
              <Card.Body>
                <div className="d-flex justify-content-center mt-3">
                  <Image
                    src={userImage}
                    roundedCircle
                    className="p-3"
                    style={{ height: "300px", width: "100%" }}
                  />
                </div>
              </Card.Body>
            </Card>
            <Card className="mb-2">
              <Card.Header>Profile Details</Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Epf:</strong> {userDataSess._userDetails.epf}
                  <br />
                  <strong>Name:</strong> {userDataSess._userDetails.name}
                  <br />
                  <strong>Role:</strong> {userDataSess._userDetails.role}
                  <br />
                  <strong>Cost Center:</strong>{" "}
                  {userDataSess._userDetails.costCenter}
                  <br />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={8} className="mb-2">
            <Card className="mb-2">
              <Card.Header>Profile Actions</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col md={12}>
                      <Tabs defaultActiveKey="changePassword" id="user-tabs">
                        <Tab eventKey="changePassword" title="Change Password">
                          <Row>
                            <Col md={5}>
                              <div className="mt-3" md={4}>
                                <Form.Group controlId="oldPassword">
                                  <Form.Label>Old Password</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Old Password"
                                    name="oldPassword"
                                    value={userDetails.password}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={5}>
                              <div className="mt-3" md={4}>
                                <Form.Group controlId="oldPassword">
                                  <Form.Label>New Password</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter New Password"
                                    name="newPassword"
                                    value=""
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </div>
                            </Col>
                            <Col md={5}>
                              <div className="mt-3" md={4}>
                                <Form.Group controlId="confirmPassword">
                                  <Form.Label>Confirm Password</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter New Password"
                                    name="confirmPassword"
                                    value=""
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </div>
                            </Col>
                            <Col md={2}>
                              <Row className="mb-5"></Row>
                              <Row>
                                <Form.Group controlId="oldPassword">
                                  <Button variant="success" id="confirmBtn">
                                    Confirm
                                  </Button>
                                </Form.Group>
                              </Row>
                            </Col>
                          </Row>
                        </Tab>
                        <Tab eventKey="settings" title="Settings">
                          <div className="mt-3">
                            <h3>User Settings</h3>
                            {/* Add settings content */}
                          </div>
                        </Tab>
                        {/* Add more tabs as needed */}
                      </Tabs>
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row></Row>
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

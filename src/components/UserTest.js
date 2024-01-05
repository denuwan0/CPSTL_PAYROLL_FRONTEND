import React from "react";
import {
  Table,
  Container,
  Button,
  Row,
  Card,
  Col,
  Modal,
  Form,
  user,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./ScrollableTable.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersonPlusFill, EyeFill, PencilSquare } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function User() {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;
  const navigate = useNavigate();
  console.log(userDataSess);
  if (userDataSess == null) {
    navigate("/login");
  }

  const [userData, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${userDataSess.jwtToken}`,
    },
  };

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

  const handleShowModal = () => {
    try {
      axios
        .get("http://13.233.230.0/api/User/GetUsers", config)
        .then((response) => {
          var data = null;
          data = response.data.data;
          console.log(response.data.data);
          setUserDetails(JSON.parse(data));
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    //console.log(userDataSess);
    //console.log(userDataSess.jwtToken);

    try {
      axios
        .get("http://13.233.230.0/api/User/GetUsers", config)
        .then((response) => {
          var data = null;
          data = response.data.data;
          //console.log(response.data.data);
          setData(JSON.parse(data));
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }, []);

  return (
    <div>
      <Header style={{ backgroundColor: "#dee2e6" }} />
      <Container className="mt-5 table-container" md={3}>
        <Row className="mb-2 ">
          <Col>
            <Card style={{ backgroundColor: "#c1dcef" }}>
              <Card.Body>
                <Row>
                  <Col className="col-md-06">
                    <Card.Title>User Details</Card.Title>
                    <Card.Text></Card.Text>
                  </Col>
                  <Col className="col-md-06">
                    <Button
                      href="/user/create"
                      variant="primary"
                      style={{ float: "right" }}
                    >
                      <i>
                        <PersonPlusFill /> Create User
                      </i>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="table-wrapper">
          <Col>
            <Card style={{ backgroundColor: "#c1dcef" }}>
              <Card.Body>
                <Table striped bordered hover className="table table-fixed">
                  <thead className="fixed-header">
                    <tr>
                      <th>#</th>
                      <th>Epf</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Username</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((row, index) => (
                      <tr key={index}>
                        <td className="table-data">{index + 1}</td>
                        <td className="table-data">{row.epf}</td>
                        <td className="table-data">{row.empName}</td>
                        <td className="table-data">{row.role}</td>
                        <td className="table-data">{row.userID}</td>
                        <td className="table-data">
                          <i>
                            <Button
                              onClick={handleShowModal}
                              className="btn btn-primary "
                              variant="warning"
                            >
                              <EyeFill />
                            </Button>
                          </i>

                          <i>
                            <Button
                              onClick={handleShowModal}
                              className="btn btn-primary "
                              variant="primary"
                            >
                              <PencilSquare />
                            </Button>
                          </i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
      <Footer />
      <Modal show={showModal} onHide={handleCloseModal} className="modal-lg">
        <Modal.Header closeButton style={{ backgroundColor: "#c1dcef" }}>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={3}>
              <Form.Group controlId="userID">
                <Form.Label>Epf:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Epf"
                  name="epf"
                  value={userDetails.epf}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={9}>
              <Form.Group controlId="userID">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="empName"
                  value={userDetails.empName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter USername"
                  name="empName"
                  value={userDetails.empName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
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
            <Col md={4}>
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
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#c1dcef" }}>
          <Button variant="primary" onClick={handleCloseModal}>
            Update
          </Button>
          <Button variant="danger" onClick={handleCloseModal}>
            Close
          </Button>
          {/* You can add additional buttons here */}
        </Modal.Footer>
      </Modal>
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

export default User;

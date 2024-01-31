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
  //console.log(userDataSess);
  if (userDataSess == null) {
    navigate("/login");
  }

  const [userData, setData] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  console.log(userData);

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
    role: "",
  });

  const [singleUserData, setSingleUserData] = useState({
    userID: "",
    epf: "",
    empName: "",
    costCenter: "",
    role: "",
  });

  //console.log(singleUserData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value.toString() });
  };

  const handleShowViewModal = async (id) => {
    try {
      axios
        .get(`http://13.234.120.62/api/User/get-user-id?id=${id}`, config)
        .then((response) => {
          var data = null;
          data = response.data.data;
          //console.log(JSON.parse(data));
          setSingleUserData(JSON.parse(data));
          setShowViewModal(true);
        })
        .catch((error) => {
          //console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      //console.error("Error logging in:", error);
    }
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    //setSingleUserData(null);
  };

  const handleShowEditModal = (id) => {
    try {
      axios
        .get(`http://13.234.120.62/api/User/get-user-id?id=${id}`, config)
        .then((response) => {
          var data = null;
          data = response.data.data;
          //console.log(JSON.parse(data));
          setSingleUserData(JSON.parse(data));
          setShowEditModal(true);
        })
        .catch((error) => {
          //console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      //console.error("Error logging in:", error);
    }
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  useEffect(() => {
    //console.log(userDataSess);
    //console.log(userDataSess.jwtToken);

    try {
      axios
        .get("http://13.234.120.62/api/User/GetUsers", config)
        .then((response) => {
          var data = null;
          data = response.data.data;
          //console.log(response.data.data);
          setData(JSON.parse(data));
        })
        .catch((error) => {
          //console.log(error);
          toast.error(error.message);
        });
    } catch (error) {
      //console.error("Error logging in:", error);
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
                      <tr key={row.id}>
                        <td className="table-data">{index + 1}</td>
                        <td className="table-data">{row.epf}</td>
                        <td className="table-data">{row.empName}</td>
                        <td className="table-data">{row.role}</td>
                        <td className="table-data">{row.userID}</td>
                        <td className="table-data">
                          <i>
                            <Button
                              onClick={() => handleShowViewModal(row.id)}
                              className="btn btn-primary "
                              variant="warning"
                            >
                              <EyeFill />
                            </Button>
                          </i>

                          <i>
                            <Button
                              onClick={() => handleShowEditModal(row.id)}
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
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        className="modal-lg"
      >
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
                  value={singleUserData.epf}
                  onChange={handleChange}
                  disabled
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
                  value={singleUserData.empName}
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
                  value={singleUserData.empName}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  name="role"
                  value={singleUserData.role}
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
                  value={singleUserData.costCenter}
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
          <Button variant="primary" onClick={handleCloseEditModal}>
            Update
          </Button>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Close
          </Button>
          {/* You can add additional buttons here */}
        </Modal.Footer>
      </Modal>
      <Modal
        show={showViewModal}
        onHide={handleCloseViewModal}
        className="modal-lg"
      >
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
                  name="epf"
                  value={singleUserData.epf}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={9}>
              <Form.Group controlId="userID">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="empName"
                  value={singleUserData.empName}
                  disabled
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
                  name="empName"
                  value={singleUserData.empName}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={singleUserData.role} disabled>
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
                  value={singleUserData.costCenter}
                  disabled
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
          <Button variant="danger" onClick={handleCloseViewModal}>
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

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
import {
  PersonPlusFill,
  EyeFill,
  PencilSquare,
  TagFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

function PayCode() {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;
  const navigate = useNavigate();
  console.log(userDataSess);
  if (userDataSess == null) {
    navigate("/login");
  }

  const [payCodeData, setData] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  //console.log(payCodeData);

  const config = {
    headers: {
      Authorization: `Bearer ${userDataSess.jwtToken}`,
    },
  };

  const [payCodeDetails, setPayCodeDetails] = useState({
    id: 0,
    companyCode: 0,
    payCode: 0,
    calCode: "",
    payCategory: "",
    description: "",
    isTaxableGross: false,
    rate: 0,
    createdBy: "",
    lastUpdateBy: "",
  });

  const [singlePayCodeData, setSinglePayCodeData] = useState({
    id: 0,
    companyCode: 0,
    payCode: 0,
    calCode: "",
    payCategory: "",
    description: "",
    isTaxableGross: false,
    rate: 0,
    createdBy: "",
    lastUpdateBy: "",
  });

  console.log(singlePayCodeData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name == "isTaxableGross") {
      if (e.target.checked == true) {
        setSinglePayCodeData({ ...singlePayCodeData, [name]: true });
      } else {
        setSinglePayCodeData({ ...singlePayCodeData, [name]: false });
      }
    } else if (e.target.name == "isTaxableGross") {
      if (e.target.checked == true) {
        setSinglePayCodeData({ ...singlePayCodeData, [name]: true });
      } else {
        setSinglePayCodeData({ ...singlePayCodeData, [name]: false });
      }
    } else if (e.target.name == "rate") {
      if (e.target.value) {
        const inputValue = parseFloat(e.target.value);
        if (inputValue < 0 || inputValue == 0) {
          setSinglePayCodeData({ ...singlePayCodeData, [name]: parseFloat(0) });
        } else if (inputValue > 1 || inputValue == 1) {
          setSinglePayCodeData({ ...singlePayCodeData, [name]: parseFloat(1) });
        } else {
          setSinglePayCodeData({
            ...singlePayCodeData,
            [name]: parseFloat(value),
          });
        }
      }
    } else {
      setSinglePayCodeData({ ...singlePayCodeData, [name]: value.toString() });
    }
  };

  const handleShowViewModal = async (id) => {
    try {
      axios
        .get(`http://13.234.120.62/api/Admin/get-paycodes-id?id=${id}`, config)
        .then((response) => {
          var data = null;
          data = response.data.data;
          //console.log(JSON.parse(data));
          setSinglePayCodeData(JSON.parse(data)[0]);
          setShowViewModal(true);
          setIsChecked(isChecked);
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
        .get(`http://13.234.120.62/api/Admin/get-paycodes-id?id=${id}`, config)
        .then((response) => {
          var data = null;
          data = response.data.data;
          console.log(JSON.parse(data));
          setSinglePayCodeData(JSON.parse(data)[0]);
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

  const handleUpdateEditModal = (id) => {
    const updatedObject = { ...singlePayCodeData };
    delete updatedObject.lastUpdateTime;
    delete updatedObject.createdBy;
    delete updatedObject.createdDate;
    delete updatedObject.createdTime;
    delete updatedObject.lastUpdateDate;
    delete updatedObject.payCategory;

    updatedObject.lastUpdateBy = userDataSess._userDetails.epf;

    try {
      axios
        .put(`http://13.234.120.62/api/Admin/update-paycode`, updatedObject)
        .then((response) => {
          var data = null;
          data = response.data.data;
          console.log(response.data.message);
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
    loadData();
    handleCloseEditModal();
  };

  const loadData = () => {
    try {
      axios
        .get("http://13.234.120.62/api/Admin/get-paycodes", config)
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
  };

  useEffect(() => {
    loadData();
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
                    <Card.Title>Paycode Details</Card.Title>
                    <Card.Text></Card.Text>
                  </Col>
                  <Col className="col-md-06">
                    <Button
                      href="/Paycode/create"
                      variant="primary"
                      style={{ float: "right" }}
                    >
                      <i>
                        <TagFill /> Create Paycode
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
                      <th>Paycode</th>
                      <th>Description</th>
                      <th>Taxable on Gross</th>
                      <th>Company</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payCodeData.map((row, index) => (
                      <tr key={row.id}>
                        <td className="table-data">{index + 1}</td>
                        <td className="table-data">{row.payCode}</td>
                        <td className="table-data">{row.description}</td>
                        <td className="table-data">
                          {(row.isTaxableGross = true ? "Yes" : "No")}
                        </td>
                        <td className="table-data">{row.companyCode}</td>
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
          <Modal.Title>Paycode Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Paycode:</Form.Label>
                <Form.Control
                  type="text"
                  name="payCode"
                  value={singlePayCodeData.payCode}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Calcode:</Form.Label>
                <Form.Control
                  type="text"
                  name="calCode"
                  value={singlePayCodeData.calCode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Company Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="companyCode"
                  value={singlePayCodeData.companyCode}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group controlId="userID">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={singlePayCodeData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Rate:</Form.Label>
                <Form.Control
                  type="number"
                  step="any" // Allows float values
                  placeholder="Enter Rate"
                  name="rate"
                  value={singlePayCodeData.rate}
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
                      checked={
                        (singlePayCodeData.isTaxableGross = true
                          ? "checked"
                          : "")
                      }
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label>isTaxableGross </Form.Label>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#c1dcef" }}>
          <Button variant="primary" onClick={handleUpdateEditModal}>
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
          <Modal.Title>Paycode Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Paycode:</Form.Label>
                <Form.Control
                  type="text"
                  name="payCode"
                  value={singlePayCodeData.payCode}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Calcode:</Form.Label>
                <Form.Control
                  type="text"
                  name="calCode"
                  value={singlePayCodeData.calCode}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Company Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="companyCode"
                  value={singlePayCodeData.companyCode}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={8}>
              <Form.Group controlId="userID">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={singlePayCodeData.description}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Rate:</Form.Label>
                <Form.Control
                  type="text"
                  name="rate"
                  value={singlePayCodeData.rate}
                  disabled
                />
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

export default PayCode;

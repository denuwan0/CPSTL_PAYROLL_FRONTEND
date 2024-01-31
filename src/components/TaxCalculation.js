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
  Badge,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./ScrollableTable.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeFill, PencilSquare, TagFill } from "react-bootstrap-icons";
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

  const [taxCalData, setTaxCalData] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  //console.log(payCodeData);

  const config = {
    headers: {
      Authorization: `Bearer ${userDataSess.jwtToken}`,
    },
  };

  const [taxCalDetail, setTaxCalDetails] = useState({
    id: 0,
    companyCode: 0,
    range: 0,
    calFormula: "",
    description: "",
    contributor: "",
    status: true,
    createdBy: "",
    lastUpdateBy: "",
  });

  const [singleTaxCalDetail, setsingleTaxCalDetail] = useState({
    id: 0,
    companyCode: 0,
    range: 0,
    calFormula: "",
    description: "",
    contributor: "",
    status: true,
    createdBy: "",
    lastUpdateBy: "",
  });

  console.log(singleTaxCalDetail);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.name == "isTaxableGross") {
      if (e.target.checked == true) {
        setsingleTaxCalDetail({ ...singleTaxCalDetail, [name]: true });
        setIsChecked(true);
      } else {
        setsingleTaxCalDetail({ ...singleTaxCalDetail, [name]: false });
        setIsChecked(false);
      }
    } else if (e.target.name == "range") {
      if (e.target.value) {
        const inputValue = parseFloat(e.target.value);
        if (inputValue < 0 || inputValue == 0) {
          setsingleTaxCalDetail({
            ...singleTaxCalDetail,
            [name]: parseInt(0),
          });
        } else {
          setsingleTaxCalDetail({
            ...singleTaxCalDetail,
            [name]: parseFloat(value),
          });
        }
      }
    } else {
      setsingleTaxCalDetail({
        ...singleTaxCalDetail,
        [name]: value.toString(),
      });
    }
  };

  const handleShowViewModal = async (id) => {
    try {
      axios
        .get(
          `http://13.234.120.62/api/Admin/get-tax-details-id?id=${id}`,
          config
        )
        .then((response) => {
          var data = null;
          data = response.data.data;
          //console.log(JSON.parse(data));
          setsingleTaxCalDetail(JSON.parse(data)[0]);
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
        .get(
          `http://13.234.120.62/api/Admin/get-tax-details-id?id=${id}`,
          config
        )
        .then((response) => {
          var data = null;
          data = response.data.data;
          console.log(JSON.parse(data));
          setsingleTaxCalDetail(JSON.parse(data)[0]);
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
    const updatedObject = { ...singleTaxCalDetail };
    delete updatedObject.lastUpdateTime;
    delete updatedObject.createdBy;
    delete updatedObject.createdDate;
    delete updatedObject.createdTime;
    delete updatedObject.lastUpdateDate;
    delete updatedObject.payCategory;

    updatedObject.lastUpdateBy = userDataSess._userDetails.epf;

    try {
      axios
        .put(`http://13.234.120.62/api/Admin/get-tax-details`, updatedObject)
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
        .get("http://13.234.120.62/api/Admin/get-tax-details", config)
        .then((response) => {
          var data = null;
          data = response.data.data;
          console.log(JSON.parse(response.data.data));
          setTaxCalData(JSON.parse(data));
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
                    <Card.Title>Tax Calculation Details</Card.Title>
                    <Card.Text></Card.Text>
                  </Col>
                  <Col className="col-md-06">
                    <Button
                      href="/TaxCalculation/create"
                      variant="primary"
                      style={{ float: "right" }}
                    >
                      <i>
                        <TagFill /> Create Tax Calculation
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
                      <th>Range</th>
                      <th>Formula</th>
                      <th>Company</th>
                      <th>Description</th>
                      <th>status</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxCalData.map((row, index) => (
                      <tr key={row.id}>
                        <td className="table-data">{index + 1}</td>
                        <td className="table-data">{row.range}</td>
                        <td className="table-data">{row.calFormula}</td>
                        <td className="table-data">{row.companyCode}</td>
                        <td className="table-data">{row.description}</td>
                        <td className="table-data">
                          {
                            (row.status = true ? (
                              <Badge bg="success">Active</Badge>
                            ) : (
                              <Badge bg="danger">Inactive</Badge>
                            ))
                          }
                        </td>
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
          <Modal.Title>Tax Calculation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Range:</Form.Label>
                <Form.Control
                  type="text"
                  name="range"
                  value={singleTaxCalDetail.range}
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-2">
              <Form.Group controlId="costCenter">
                <Form.Label>Company</Form.Label>
                <Form.Select
                  name="companyCode"
                  value={singleTaxCalDetail.companyCode}
                  onChange={handleChange}
                >
                  <option value="2000">2000 CPC</option>
                  <option value="3000">3000 CPSTL</option>

                  {/* Add more options as needed */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-2">
              <Form.Group controlId="costCenter">
                <Form.Label>Contributor</Form.Label>
                <Form.Select
                  name="contributor"
                  value={singleTaxCalDetail.contributor}
                  onChange={handleChange}
                >
                  <option value="E">Employee</option>
                  <option value="C">Company</option>

                  {/* Add more options as needed */}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="userID">
                <Form.Label>Formula:</Form.Label>
                <Form.Control
                  type="text"
                  name="calFormula"
                  value={singleTaxCalDetail.calFormula}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="userID">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={singleTaxCalDetail.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="mb-2" md={3}>
              <Form.Group controlId="empName">
                <Row className="mt-4">
                  <Col md={2}>
                    <Form.Control
                      className="form-check-input"
                      type="checkbox"
                      name="isTaxableGross"
                      onChange={handleChange}
                      checked={isChecked}
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
          <Modal.Title>Tax Calculation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group controlId="userID">
                <Form.Label>Range:</Form.Label>
                <Form.Control
                  type="text"
                  name="range"
                  value={singleTaxCalDetail.range}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-2">
              <Form.Group controlId="costCenter">
                <Form.Label>Company</Form.Label>
                <Form.Select
                  name="companyCode"
                  value={singleTaxCalDetail.companyCode}
                  onChange={handleChange}
                  disabled
                >
                  <option value="2000">2000 CPC</option>
                  <option value="3000">3000 CPSTL</option>

                  {/* Add more options as needed */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4} className="mb-2">
              <Form.Group controlId="costCenter">
                <Form.Label>Contributor</Form.Label>
                <Form.Select
                  name="contributor"
                  value={singleTaxCalDetail.contributor}
                  onChange={handleChange}
                  disabled
                >
                  <option value="E">Employee</option>
                  <option value="C">Company</option>

                  {/* Add more options as needed */}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="userID">
                <Form.Label>Formula:</Form.Label>
                <Form.Control
                  type="text"
                  name="calFormula"
                  value={singleTaxCalDetail.calFormula}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="userID">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={singleTaxCalDetail.description}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="mb-2" md={3}>
              <Form.Group controlId="empName">
                <Row className="mt-4">
                  <Col md={6}>
                    <Form.Label>Status: </Form.Label>
                  </Col>
                  <Col md={2}>
                    {
                      (singleTaxCalDetail.status = true ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="danger">Inactive</Badge>
                      ))
                    }
                  </Col>
                </Row>
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

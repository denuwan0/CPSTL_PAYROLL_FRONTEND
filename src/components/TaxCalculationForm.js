import React, { useState } from "react";
import { Form, Container, Button, Row, Card, Col } from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FilePostFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import "./ScrollableTable.css";

const TaxCalculationForm = () => {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userDataSess = userDataFromStorage
    ? JSON.parse(userDataFromStorage)
    : null;
  const navigate = useNavigate();

  const [taxDetails, setTaxDetails] = useState({
    id: "",
    range: "",
    calFormula: "",
    description: "",
    status: "",
    companyCode: "3000",
    contributor: "",
    createdBy: userDataSess._userDetails.epf,
    lastupdateBy: userDataSess._userDetails.epf,
  });

  console.log(taxDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaxDetails({ ...taxDetails, [name]: value.toString() });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(taxDetails.calFormula);
    // const count = taxDetails.calFormula.match(/{|}|\(|\)/g);

    var theString = taxDetails.calFormula;
    const openBracket1 = theString.split("(").length - 1;
    const closeBracket1 = theString.split(")").length - 1;
    const openBracket2 = theString.split("{").length - 1;
    const closeBracket2 = theString.split("}").length - 1;

    console.log(theString);
    console.log("openBracket1 " + openBracket1);
    console.log("closeBracket1 " + closeBracket1);
    console.log("openBracket2 " + openBracket2);
    console.log("closeBracket2 " + closeBracket2);

    var bracketType1tot = 0;
    var bracketType2tot = 0;

    if (openBracket1 % 2 == 0 && closeBracket1 % 2 == 0) {
      bracketType1tot = openBracket1 + closeBracket1;
      console.log("openBracket1 closeBracket1 even " + (openBracket1 % 2));
    } else if (openBracket1 % 2 == 1 && closeBracket1 % 2 == 1) {
      console.log("openBracket1 closeBracket1 odd " + (openBracket1 % 2));
    }

    if (openBracket2 % 2 == 0 && closeBracket2 % 2 == 0) {
      bracketType2tot = openBracket2 + closeBracket2;
    } else if (openBracket2 % 2 == 1 && closeBracket2 % 2 == 1) {
    }

    console.log(bracketType1tot);
    console.log(bracketType2tot);

    const config = {
      headers: {
        Authorization: `Bearer ${userDataSess.jwtToken}`,
        ContentType: "application / json",
      },
    };

    if (
      taxDetails.id !== "" &&
      taxDetails.range !== "" &&
      taxDetails.calFormula !== "" &&
      taxDetails.description !== "" &&
      taxDetails.status !== "" &&
      taxDetails.contributor !== "" &&
      taxDetails.companyCode !== "" &&
      taxDetails.createdBy !== "" &&
      taxDetails.lastupdateBy !== ""
    ) {
      axios
        .post("http://13.234.120.62/api/Admin/create-tax", taxDetails, config)
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
                    <Card.Title>Create Tax Calculation</Card.Title>
                    <Card.Text></Card.Text>
                  </Col>
                  <Col className="col-md-06">
                    <Button
                      href=""
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
                          <Form.Label>Range</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Range"
                            name="range"
                            value={taxDetails.range}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-2">
                        <Form.Group controlId="epf">
                          <Form.Label>Formula </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Formula"
                            name="calFormula"
                            value={taxDetails.calFormula}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Col>
                    <Col md={8}>
                      <Col className="mb-2">
                        <Form.Group controlId="empName">
                          <Form.Label>Description </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            name="description"
                            value={taxDetails.description}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Row>
                        <Col md={6} className="mb-2">
                          <Form.Group controlId="costCenter">
                            <Form.Label>Company Code</Form.Label>
                            <Form.Select
                              name="companyCode"
                              value={taxDetails.companyCode}
                              onChange={handleChange}
                            >
                              <option value="3000">3000 CPSTL</option>
                              <option value="2000">2000 CPC</option>
                              {/* Add more options as needed */}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6} className="mb-2">
                          <Form.Group controlId="role">
                            <Form.Label>Contributor</Form.Label>
                            <Form.Select
                              name="contributor"
                              value={taxDetails.contributor}
                              onChange={handleChange}
                            >
                              <option value="E">Employee</option>
                              <option value="C">Company</option>
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

export default TaxCalculationForm;

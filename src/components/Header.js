import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Image,
  Badge,
} from "react-bootstrap";
import { ArrowRight, FilePerson, Power } from "react-bootstrap-icons";
import "../data/header.css";
import logoImage from "../images/logo.png";

export default function header() {
  const userDataFromStorage = sessionStorage.getItem("userData");
  const userData = userDataFromStorage ? JSON.parse(userDataFromStorage) : null;

  const handleUserLogout = () => {
    sessionStorage.removeItem("userData");
  };

  //console.log(userData);
  return (
    <div>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/dashboard" style={{ color: "white" }}>
            <Image src={logoImage} alt="Logo" width="60" height="60" />
          </Navbar.Brand>
          <Navbar.Brand href="/dashboard" style={{ color: "white" }}>
            <h4>
              <u>CPSTL PAYROLL</u>
            </h4>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown
                title={
                  <span className="text-light my-auto">
                    <b>User</b>
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/user">User Details</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <span className="text-light my-auto">
                    <b>Tax</b>
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/SpecialTaxEmp">
                  Employee Special Tax
                </NavDropdown.Item>
                <NavDropdown.Item href="/TaxCalculation">
                  Tax Calculation
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <span className="text-light my-auto">
                    <b>Payroll</b>
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/PayCode">Paycode</NavDropdown.Item>
                <NavDropdown.Item href="/calculation">
                  Calculation
                </NavDropdown.Item>
                <NavDropdown.Item href="/Control">Control</NavDropdown.Item>
                <NavDropdown.Item href="/Control/detail">
                  Control Detail
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                title={
                  <span className="text-light my-auto">
                    <b>Paysheet</b>
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/paysheet">
                  Paysheet Details
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Badge
              bg="light"
              style={{ margin: "10px", fontSize: "20px", color: "Black" }}
            >
              {userData._userDetails.epf}
            </Badge>
            <NavDropdown
              title={
                <span className="text-light my-auto">
                  <b>Profile</b>
                </span>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="/user/profile">
                <li>
                  <FilePerson />
                  <span style={{ marginLeft: "5px" }}>My Profile</span>
                </li>
              </NavDropdown.Item>
              <NavDropdown.Item href="/" bg="success">
                <li>
                  <Power />
                  <span
                    style={{ marginLeft: "5px" }}
                    onClick={handleUserLogout}
                  >
                    Log out
                  </span>
                </li>
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

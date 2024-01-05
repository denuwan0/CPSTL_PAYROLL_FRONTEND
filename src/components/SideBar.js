import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../data/sideBar.css";

export default function NavBar() {
  return (
    <div className="sidebar">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              SideBar.js
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

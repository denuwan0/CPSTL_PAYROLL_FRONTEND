import React from "react";
import User from "./UserTest";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import UserWelcome from "./UserWelcome";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";
import Chart4 from "./Chart4";

export default function Dashboard() {
  return (
    <div className="align" style={{}}>
      <Header style={{ backgroundColor: "#dee2e6" }} />
      <Container md={12} className="">
        <Row
          className="mt-3"
          md={12}
          style={{
            margin: "inherit",
            maxWidth: "-webkit-fill-available",
          }}
        >
          <Col md={6}>
            <Card className="text-center">
              <Card.Header>OT Hours (function wise)</Card.Header>
              <Card.Body>
                <Chart1 />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="text-center">
              <Card.Header>OT Amount (function wise)</Card.Header>
              <Card.Body>
                <Chart2 />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row
          className="mt-3"
          md={12}
          style={{
            margin: "inherit",
            maxWidth: "-webkit-fill-available",
          }}
        >
          <Col md={4}>
            <Card className="text-center">
              <Card.Header>Current Payroll Breackdown</Card.Header>
              <Card.Body>
                <Chart3 />
              </Card.Body>
            </Card>
          </Col>
          <Col md={5}>
            <Card className="text-center">
              <Card.Header>Total OT comparison</Card.Header>
              <Card.Body>
                <Chart4 />
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="text-center" style={{ height: "290px" }}>
              <Card.Header>Gneral Details</Card.Header>
              <Card.Body style={{ textAlign: "left" }}>
                <ul>
                  <li>Active Employee count: xxxxxx</li>
                  <li>Active Employee count: xxxxxx</li>
                  <li>Active Employee count: xxxxxx</li>
                  <li>Active Employee count: xxxxxx</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <Footer /> */}
    </div>
  );
}

import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../data/footer.css";

export default function footer() {
  return (
    <div>
      <footer className="custom-footer">
        <Container>
          <Row>
            <Col className="text-center">
              <p>&copy; 2023 CPSTL PAYROLL. All Rights Reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

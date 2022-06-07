import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function GeneralSetting() {
  return (
    <Form className="setting-form">
      <Container fluid>
        <Row>
          <Col xs={6}>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Photo</Form.Label>
                  <Form.Control className="py-2" type="text" placeholder="Url of profile picture" />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Username</Form.Label>
                  <Form.Control className="py-2" type="text" value="nvbluutru" />
                </Form.Group>
              </Col>
              <Col xs={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control className="py-2" type="text" value="nvbluutru@gmail.com" />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Password</Form.Label>
                  <Form.Control className="py-2" type="password" value="Nguyễn Văn Bảo" />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">About</Form.Label>
                  <Form.Control as="textarea" className="resize-none" />
                </Form.Group>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button variant="primary">Change</Button>
      </Container>
    </Form>
  );
}

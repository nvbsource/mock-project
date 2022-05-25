import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function GeneralSetting() {
  return (
    <Form className="setting-form">
      <h2 className="text-center my-4">Edit Profile</h2>
      <Container fluid>
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-2">
              <Form.Label>Photo</Form.Label>
              <Form.Control type="text" placeholder="Url of profile picture" />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" value="nvbluutru" />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group className="mb-2">
              <Form.Label>About</Form.Label>
              <Form.Control type="text" placeholder="Short bio about you" />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value="nvbluutru@gmail.com" />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value="Nguyễn Văn Bảo" />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

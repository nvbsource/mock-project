import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

export default function GeneralSetting() {
  const editorRef = useRef<any>(null);
  return (
    <Form className="setting-form">
      <Container fluid>
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
              <Editor
                apiKey="nqbiutl3i83bkdoklqoybhc2v3c6wyy9kyj5nx24n96puhel"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar: "undo redo | blocks | " + "bold italic forecolor | alignleft aligncenter " + "alignright alignjustify | bullist numlist outdent indent | " + "removeformat | help",
                  content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </Form>
  );
}

import React from "react";
import { Form } from "react-bootstrap";

export default function InputField({ field, icon, form, ...props }: any) {
  const { name } = field;
  const { errors, touched } = form;
  return (
    <Form.Group className="form-bordered">
      {icon}
      <Form.Control
        className="form-input"
        id={name}
        {...field}
        {...props}
        isValid={touched[name]}
        isInvalid={touched[name] && errors[name]}
      />
      <Form.Control.Feedback type="invalid">{errors[name]}</Form.Control.Feedback>
    </Form.Group>
  );
}

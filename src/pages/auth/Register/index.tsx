import React from "react";
import RegisterForm from "./Register";
import Form from "../../../HOC/Form";

export default function Login() {
  return <Form Component={<RegisterForm />} title="Register Form" desc="use the system account to log in" />;
}

import React from "react";
import LoginForm from "./Login";
import Form from "../../../HOC/Form";

export default function Login() {
  return <Form Component={<LoginForm />} title="Login Form" desc="use the system account to log in" />;
}

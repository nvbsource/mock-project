import React from "react";
import LoginForm from "./Login";
import Form from "../../../HOC/Form";

export default function Login() {
  return <Form Component={<LoginForm />} title="Login Meetmax" desc="Use the system account to log in" />;
}

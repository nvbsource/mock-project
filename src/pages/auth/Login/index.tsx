import React from "react";
import LoginForm from "./Login";
import Form from "../../../HOC/Form";
import { Navigate } from "react-router-dom";

export default function Login() {
  const access_token = localStorage.getItem("user_information");
  if (access_token) {
    return <Navigate to="/" />;
  }
  return <Form Component={<LoginForm />} title="Login Meetmax" desc="Use the system account to log in" />;
}

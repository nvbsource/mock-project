import React from "react";
import RegisterForm from "./Register";
import Form from "../../../HOC/Form";
import { Navigate } from "react-router-dom";

export default function Login() {
  const access_token = localStorage.getItem("user_information");
  if (access_token) {
    return <Navigate to="/" />;
  }
  return <Form Component={<RegisterForm />} title="Register Meetmax" desc="use the system account to log in" />;
}

import React from "react";
import ForgotPasswordForm from "./ForgotPassword";
import Form from "../../../HOC/Form";
import { Navigate } from "react-router-dom";

export default function ForgotPassword() {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return <Navigate to="/" />;
  }
  return <Form Component={<ForgotPasswordForm />} title="Forgot Passwrod" desc="use the system account to log in" />;
}

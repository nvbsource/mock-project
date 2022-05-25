import React from "react";
import ForgotPasswordForm from "./ForgotPassword";
import Form from "../../../HOC/Form";

export default function ForgotPassword() {
  return <Form Component={<ForgotPasswordForm />} title="Forgot Passwrod" desc="use the system account to log in" />;
}

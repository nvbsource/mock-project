import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/Layout/Form/InputField";
export default function ForgotPasswordForm() {
  return (
    <>
      <InputField
        type="text"
        className="form-control"
        placeholder="Email Address"
        icon={<i className="fa-solid fa-user form-icon"></i>}
      />
      <button className="form-button">Reset Password</button>
      <div className="form-register">
        <p>You haven't any account?</p>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}

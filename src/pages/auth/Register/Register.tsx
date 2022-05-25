import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/Layout/Form/InputField";
export default function RegisterForm() {
  return (
    <>
      <InputField
        type="text"
        className="form-control"
        placeholder="Username"
        icon={<i className="fa-solid fa-user form-icon"></i>}
      />
      <InputField
        type="email"
        className="form-control"
        placeholder="Email"
        icon={<i className="fa-solid fa-envelope"></i>}
      />
      <InputField
        type="password"
        className="form-control"
        placeholder="Password"
        icon={<i className="fa-solid fa-lock form-icon"></i>}
      />
      <InputField
        type="password"
        className="form-control"
        placeholder="Confirm password"
        icon={<i className="fa-solid fa-lock form-icon"></i>}
      />
      <button className="form-button">Sign up</button>
      <div className="form-register">
        <p>Already have an account? </p>
        <Link to="/login">Login</Link>
      </div>
    </>
  );
}

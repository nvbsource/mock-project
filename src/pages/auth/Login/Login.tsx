import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/Layout/Form/InputField";
export default function LoginForm() {
  return (
    <>
      <InputField
        type="text"
        className="form-control"
        placeholder="Email Address"
        icon={<i className="fa-solid fa-user form-icon"></i>}
      />
      <InputField
        type="password"
        className="form-control"
        placeholder="Password"
        icon={<i className="fa-solid fa-lock form-icon"></i>}
      />
      <div className="form-footer">
        <div className="form-remember">
          <input type="checkbox" className="form-checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <Link to="/forgot-password">Forgot password</Link>
      </div>
      <button className="form-button">Sign in</button>
      <div className="form-register">
        <p>You haven't any account?</p>
        <Link to="/register">Register</Link>
      </div>
    </>
  );
}

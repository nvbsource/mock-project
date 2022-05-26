import { FastField, Form, Formik } from "formik";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import InputField from "../../../components/Layout/Form/InputField";
import * as Yup from "yup";
import IconLoading from "../../../components/Layout/Loading/IconLoading";
interface MyFormValues {
  email: string;
  password: string;
}
const LoginSchema = Yup.object({
  email: Yup.string().required("Email address can not blank!").email("Email invalid!"),
  password: Yup.string().required("Password can not blank!"),
});
export default function LoginForm() {
  const initialValues: MyFormValues = { email: "", password: "" };
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          localStorage.setItem("access_token", "fake-token");
          navigate("/");
          setSubmitting(false);
        }, 3000);
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit} className="needs-validation">
          <FastField
            name="email"
            component={InputField}
            type="text"
            placeholder="Email Address"
            icon={<i className="fa-solid fa-user form-icon"></i>}
          />
          <FastField
            name="password"
            component={InputField}
            type="password"
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
          <button className="form-button" disabled={isSubmitting}>
            Sign in {isSubmitting && <IconLoading />}
          </button>
          <div className="form-register">
            <p>You haven't any account?</p>
            <Link to="/register">Register</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

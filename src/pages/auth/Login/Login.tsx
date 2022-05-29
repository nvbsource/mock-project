import { login, selectLogging } from "features/auth/authSlice";
import { FastField, Form, Formik } from "formik";
import InputField from "Layout/Form/InputField";
import IconLoading from "Layout/Loading/IconLoading";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch } from "../../../app/hooks";
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
  const dispatch = useAppDispatch();
  const logging = useSelector(selectLogging);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        dispatch(login({ email: values.email, password: values.password }));
      }}
    >
      {({ handleSubmit }) => (
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
          <button className="form-button" disabled={logging}>
            Sign in {logging && <IconLoading />}
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

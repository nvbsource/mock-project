import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../Layout/Form/InputField";
import * as Yup from "yup";
import { FastField, Formik } from "formik";
import { Form } from "react-bootstrap";
import IconLoading from "../../../Layout/Loading/IconLoading";
import { useAppDispatch } from "../../../app/hooks";
import { register } from "features/auth/authSlice";
import { useAppSelector } from "app/hooks";
import { selectRegisterLoading } from "../../../features/auth/authSlice";
interface MyFormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
const LoginSchema = Yup.object({
  username: Yup.string().required("Username can not blank!"),
  email: Yup.string().required("Email address can not blank!").email("Email invalid!"),
  password: Yup.string().required("Password can not blank!"),
  confirmPassword: Yup.string()
    .required("Password can not blank!")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectRegisterLoading);
  const initialValues: MyFormValues = { email: "", username: "", password: "", confirmPassword: "" };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        dispatch(register(values));
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <FastField
            name="username"
            component={InputField}
            type="text"
            placeholder="Username"
            icon={<i className="fa-solid fa-user form-icon"></i>}
          />
          <FastField
            name="email"
            component={InputField}
            type="email"
            placeholder="Email"
            icon={<i className="fa-solid fa-envelope"></i>}
          />
          <FastField
            name="password"
            component={InputField}
            type="password"
            placeholder="Password"
            icon={<i className="fa-solid fa-lock form-icon"></i>}
          />
          <FastField
            name="confirmPassword"
            component={InputField}
            type="password"
            placeholder="Confirm password"
            icon={<i className="fa-solid fa-lock form-icon"></i>}
          />
          <button className="form-button" disabled={loading}>
            Sign up {loading && <IconLoading />}
          </button>
          <div className="form-register">
            <p>Already have an account? </p>
            <Link to="/login">Login</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

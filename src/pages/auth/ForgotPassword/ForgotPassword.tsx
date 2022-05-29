import React from "react";
import { Link } from "react-router-dom";
import InputField from "../../../Layout/Form/InputField";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import IconLoading from "../../../Layout/Loading/IconLoading";
interface MyFormValues {
  email: string;
}
const ForgotPasswordSchema = Yup.object({
  email: Yup.string().required("Email address can not blank!").email("Email invalid!"),
});
export default function ForgotPasswordForm() {
  const initialValues: MyFormValues = { email: "" };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ForgotPasswordSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 3000);
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <FastField
            name="email"
            component={InputField}
            type="text"
            placeholder="Email Address"
            icon={<i className="fa-solid fa-user form-icon"></i>}
          />
          <button className="form-button" disabled={isSubmitting}>
            Reset Password {isSubmitting && <IconLoading />}
          </button>
          <div className="form-register">
            <p>You haven't any account?</p>
            <Link to="/login">Login</Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

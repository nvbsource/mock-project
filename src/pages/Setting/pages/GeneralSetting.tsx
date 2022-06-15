import { useAppSelector } from "app/hooks";
import { selectLoadingUpdateProfile, updateProfile } from "features/profile/profileSlice";
import { FastField, Formik } from "formik";
import InputField from "Layout/Form/InputField";
import React from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { useAppDispatch } from "../../../app/hooks";
interface MyFormValues {
  username: string;
  image: string;
  bio: string;
  password: string;
}
const LoginSchema = Yup.object({
  username: Yup.string().required("Username can not blank!"),
});
export default function LoginForm() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoadingUpdateProfile);
  const localStorageData = localStorage.getItem("user_information");
  const information = localStorageData ? JSON.parse(localStorageData) : {};
  const initialValues: MyFormValues = {
    username: information.username,
    image: information.image || "",
    bio: information.bio || "",
    password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        dispatch(updateProfile({ ...values }));
      }}
    >
      {({ handleSubmit }) => (
        <Form className="setting-form">
          <Container fluid>
            <Row>
              <Col xs={12}>
                <FastField
                  name="username"
                  component={InputField}
                  type="text"
                  placeholder="Username"
                  icon={<i className="fa-solid fa-user form-icon"></i>}
                />
              </Col>
              <Col xs={12}>
                <FastField
                  name="image"
                  component={InputField}
                  type="text"
                  placeholder="Image"
                  icon={<i className="fa-solid fa-image"></i>}
                />
              </Col>
              <Col xs={12}>
                <FastField
                  name="bio"
                  component={InputField}
                  type="text"
                  placeholder="About"
                  icon={<i className="fa-solid fa-address-card"></i>}
                />
              </Col>
              <Col xs={12}>
                <FastField
                  name="password"
                  component={InputField}
                  type="text"
                  placeholder="New Password"
                  icon={<i className="fa-solid fa-address-card"></i>}
                />
              </Col>
            </Row>
            <Button variant="primary" onClick={() => handleSubmit()} disabled={loading}>
              Change {loading && <Spinner animation="border" size="sm" />}
            </Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

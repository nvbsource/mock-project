import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Props } from "../../app/interface";

export default function PrivateRoutes({ children }: Props) {
  const access_token = localStorage.getItem("user_information");
  if (!access_token) {
    toast("Required Authenticate", { type: "warning", autoClose: 2000 });
  }
  return access_token ? children : <Navigate to="/login" />;
}

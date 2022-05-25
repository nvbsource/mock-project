import React from "react";
import { Navigate } from "react-router-dom";
import { Props } from "../../../app/interface";

export default function PrivateRoutes({ children }: Props) {
  const access_token = localStorage.getItem("access_token");
  return access_token ? children : <Navigate to="/login" />;
}

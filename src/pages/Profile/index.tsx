import React, { useEffect } from "react";
import apiUser from "../../services/user.service";
export default function Profile() {
  useEffect(() => {
    apiUser.getInformation().then((res) => {
      console.log(res);
    });
  }, []);
  return <div className="wrapper">Profile</div>;
}

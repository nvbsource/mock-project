import { InformationUser, UserLogin, UserRegister } from "../models/user.model";
import httpRequest from "../api/configApi";
const users = {
  login: (user: UserLogin): Promise<InformationUser> => {
    return httpRequest.post("/users/login", {
      user: {
        email: user.email,
        password: user.password,
      },
    });
  },
  register: (user: UserRegister) => {
    return httpRequest.post("/users", { user });
  },
  update: (user: InformationUser) => {
    return httpRequest.put("/user", { user });
  },
  getInformation: () => {
    return httpRequest.get("/user");
  },
};
export default users;

import httpRequest from "../api/configApi";
const tags = {
  getTags: () => {
    return httpRequest.get("/tags");
  },
};
export default tags;

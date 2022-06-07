import httpRequest from "../api/configApi";
const profiles = {
  getProfile: (username: string) => {
    return httpRequest.get(`/profiles/${username}`);
  },
  followUser: (username: string) => {
    return httpRequest.post(`/profiles/${username}/follow`);
  },
  unFollowUser: (username: string) => {
    return httpRequest.delete(`/profiles/${username}/follow`);
  },
};
export default profiles;

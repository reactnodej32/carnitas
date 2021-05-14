import axios from "axios";
export const fetchUsers = () => {
  return axios.get("/api/admin/users");
};

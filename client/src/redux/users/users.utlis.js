import axios from "axios";
export const fetchUsers = () => {
  return axios.get("/api/admin/users");
};

export const fetchdeleteUser = (chosen_user) => {
  return axios.delete("/api/admin/deleteuser", {
    data: { email: chosen_user },
  });
};

export const fetchCreatedUser = ({ displayName, email, password }) => {
  return axios.post("/api/admin/createuser", {
    username: displayName,
    name: displayName,
    email: email,
    password: password,
  });
};

export const fetchModifyUser = ({ email, motto }) => {
  return axios.put("/api/admin/updateuser", { email: email, motto: motto });
};

export const fetchGroup = () => {
  return axios.get("/api/admin/group");
};

export const fetchCreateGroup = (group) => {
  return axios.post("/api/admin/creategroup", { name: group });
};

export const fetchChangePrivilege = (email) => {
  return axios.post("/api/admin/privileges", { email: email });
};

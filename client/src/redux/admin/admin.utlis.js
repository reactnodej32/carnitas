import axios from "axios";
import jwt_decode from "jwt-decode";
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("adminToken", JSON.stringify(token));
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    localStorage.removeItem("adminToken");
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
    return;
  }
  return jwt_decode(token);
};

export const checkAdminToken = () => {
  if (!localStorage.adminToken) return false;
  // Set auth token header auth
  const token = JSON.parse(localStorage.adminToken);
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  return decoded;
};

export const registerAdmin = (credentials) => {
  return axios.post("/api/admin/register", credentials);
};

export const loginAdmin = (credentials) => {
  return axios.post("/api/admin/login", credentials).then((res) => res.data);
};

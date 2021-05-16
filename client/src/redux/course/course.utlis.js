import axios from "axios";
export const fetchCreatedCourse = ({ payload }) => {
  return axios.post("/api/admin/createcourse", { name: payload });
};

export const fetchCourse = () => {
  return axios.get("/api/admin/course");
};

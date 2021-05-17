import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import Profile from "../components/Profile";
import Courses from "../components/Courses";
import deviceStorage from "../utils/jwt-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
export const Home = ({ history }) => {
  const [page, setPage] = useState({ profile: true, courses: false });
  const [user, setUser] = useState(null);
  const [user_api_courses, setApiCourses] = useState([]);
  useEffect(
    () => {
      const getJwt = async () => {
        const jwt = await deviceStorage.loadJWT("user");
        axios.defaults.headers.common["Authorization"] = jwt;
        const decoded_jwt = jwt_decode(jwt);

        const {
          data,
        } = await axios.post(
          "https://carinitass.herokuapp.com/api/user/mycourses",
          { user: decoded_jwt }
        );
        console.log(data);
        // setApiCourses(data);
        setUser(decoded_jwt);
      };
      getJwt();
    },
    //Make request again when we go to profile page
    [page.profile]
  );
  const filterPage = (chosen_page) => {
    let newPage = { ...page };
    Object.keys(newPage).forEach((v) =>
      v === chosen_page ? (newPage[v] = true) : (newPage[v] = false)
    );
    setPage(newPage);
  };
  const setCourseCallback = (add_course) => {
    let NewAddedCourse = [...user_api_courses];
    NewAddedCourse.push(add_course);
    setApiCourses(NewAddedCourse);
  };
  console.log(user_api_courses);
  return (
    <View style={styles.container}>
      {page.profile ? (
        <Profile
          history={history}
          user={user}
          user_api_courses={user_api_courses}
        />
      ) : null}
      {page.courses ? (
        <Courses setCourseCallback={setCourseCallback} user={user} />
      ) : null}
      <TouchableOpacity
        onPress={() => filterPage("courses")}
        style={styles.box_left}
      >
        <Text style={styles.box_text}>Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => filterPage("profile")}
        style={styles.box_right}
      >
        <Text style={styles.box_text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

/*

*/
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
    position: "relative",
  },
  top_container: {
    height: "90%",
    backgroundColor: "yellow",
  },
  box_left: {
    position: "absolute",
    bottom: 0,
    height: "10%",
    width: "50%",
    backgroundColor: "#2379fa",
    justifyContent: "center",
    alignItems: "center",
  },
  box_text: {
    color: "white",
    fontSize: 20,
  },
  box_right: {
    position: "absolute",
    bottom: 0,
    right: 0,
    height: "10%",
    width: "50%",
    backgroundColor: "#2379fa",
    justifyContent: "center",
    alignItems: "center",
  },
});

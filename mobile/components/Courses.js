import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Button, Card, ListItem, Icon } from "react-native-elements";
import axios from "axios";
/*
Paginiation is implemented here
*/

const Courses = ({ user = null, setCourseCallback }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [courses, setCourses] = useState(null);
  // The useEffect is triggered upon every next page or previous page
  // button clicks
  // Thus Makes a request to api/user/course
  useEffect(() => {
    axios
      .get("https://carinitass.herokuapp.com/api/user/course", {
        params: { page: pageNumber },
      })
      .then((res) => {
        setCourses(res.data);
      });
  }, [pageNumber]);

  const joinCourse = (name) => {
    axios
      .post(`https://carinitass.herokuapp.com/api/user/joincourse/${user.id}`, {
        chosen_course: name,
      })
      .then((res) => {
        setCourseCallback(res.data);
      })
      .catch((error) => {
        Alert.alert("Warning ", JSON.stringify(error.response.data), [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.courses}>
        {courses
          ? courses.map(({ name, stuff, _id }, i) => (
              <Card key={_id}>
                <Card.Title>{name}</Card.Title>
                <Card.Divider />

                <Text style={{ marginBottom: 10 }}>{stuff}</Text>
                <Button
                  onPress={() => joinCourse(name)}
                  icon={<Icon name="code" color="#ffffff" />}
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="Join Course"
                />
              </Card>
            ))
          : null}
      </View>
      <View style={styles.pageNumber}>
        <Text style={{ fontSize: 20 }}>{pageNumber}</Text>
      </View>
      <View style={styles.buttons}>
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => setPageNumber(pageNumber === 0 ? 0 : pageNumber - 1)}
          title="previous page"
        />
        <Button
          buttonStyle={styles.loginButton}
          onPress={() => setPageNumber(pageNumber + 1)}
          title="next page"
        />
      </View>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  courses: {
    height: "85%",
    width: "100%",
    // backgroundColor: "purple",
    justifyContent: "center",
  },
  pageNumber: {
    width: "100%",
    height: "5%",

    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // backgroundColor: "yellow",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    // backgroundColor: "red",
    alignItems: "center",
    alignContent: "center",
    width: "100%",
    height: "10%",
  },
  loginButton: {
    margin: 5,
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  container: {
    height: "90%",
    backgroundColor: "#4968bf",
  },
});

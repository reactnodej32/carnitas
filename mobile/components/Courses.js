import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, ListItem, Icon } from "react-native-elements";
import axios from "axios";

const Courses = ({ user = null }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [courses, setCourses] = useState(null);
  useEffect(() => {
    axios
      .get("https://carinitass.herokuapp.com/api/user/course", {
        params: { page: pageNumber },
      })
      .then((res) => {
        setCourses(res.data);
      });
  }, [pageNumber]);

  return (
    <View style={styles.container}>
      <View style={styles.courses}>
        {courses
          ? courses.map(({ name, stuff }, i) => (
              <Card>
                <Card.Title>{name}</Card.Title>
                <Card.Divider />

                <Text style={{ marginBottom: 10 }}>{stuff}</Text>
                <Button
                  onPress={() => console.log(name)}
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

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card } from "react-native-elements";
import deviceStorage from "../utils/jwt-storage";

import { Avatar } from "react-native-elements";

// backgroundColor: "#4968bf",
const Profile = ({ history, user, user_api_courses }) => {
  const signOut = () => {
    deviceStorage.deleteJWT();
    history.push("/");
  };

  return (
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        rounded
        title="CR"
        source={{
          uri:
            "https://www.stylevore.com/wp-content/uploads/2019/06/Sonya-Rudskaya-La-imagen-puede-contener-1-persona-primer-plano.jpg",
        }}
        onPress={() => console.log("Works!")}
        activeOpacity={0.7}
      />
      <Text style={styles.text}>{user ? user.name : null}</Text>
      <Text style={styles.text}>{user ? user.motto : null}</Text>
      <Button
        buttonStyle={styles.loginoutButton}
        onPress={() => signOut()}
        title="Logout"
      />
      <View style={{ height: "40%", width: "80%" }}>
        <ScrollView
        // style={{ backgroundColor: "red" }}
        >
          {user_api_courses.length > 0
            ? user_api_courses.map(({ name, stuff, _id }, i) => (
                <Card key={_id}>
                  <Card.Title>{name}</Card.Title>
                  <Card.Divider />

                  <Text style={{ marginBottom: 10 }}>{stuff}</Text>
                </Card>
              ))
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  loginoutButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  container: {
    height: "90%",
    backgroundColor: "#4968bf",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Cochin",
    color: "white",
    fontWeight: "600",
    fontSize: 20,
  },
});

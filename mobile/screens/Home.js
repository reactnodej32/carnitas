import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import deviceStorage from "../utils/jwt-storage";
export const Home = ({ history }) => {
  const signOut = () => {
    deviceStorage.deleteJWT();
    history.push("/");
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="change page" onPress={() => signOut()} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66a4ff",
    alignItems: "center",
    justifyContent: "center",
  },
});

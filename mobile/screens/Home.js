import React from "react";
import { View, Text, Button } from "react-native";

export const Home = ({ history }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button title="change page" onPress={() => history.push("/signin")} />
    </View>
  );
};

export default Home;

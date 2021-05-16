import React from "react";
import { View, Text, Button } from "react-native";

export const SignUp = ({ history }) => {
  return (
    <View>
      <Text>This is the sign up page</Text>
      <Button title="Sign In" onPress={() => history.push("/")} />
    </View>
  );
};

export default SignUp;

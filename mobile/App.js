import { StatusBar } from "expo-status-bar";
import React from "react";
import axios from "axios";
import {
  Keyboard,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
} from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import Home from "./screens/Home";
import SignIn from "./screens/Sign-in";
import SignUp from "./screens/Sign-up";
export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66a4ff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

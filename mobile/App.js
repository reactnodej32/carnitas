import React from "react";

import { StyleSheet, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import Home from "./screens/Home";

import Authentication from "./screens/Authentication";

export const App = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </View>
    </NativeRouter>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#66a4ff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

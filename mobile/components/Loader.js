import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
export const Loader = () => {
  return (
    <View
      style={{
        height: "100%",
        backgroundColor: "#66a4ff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "50%",
          height: "50%",
          // backgroundColor: "purple",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          // style={styles.loginFormView}
          size="large"
          color={"red"}
          style={{
            // backgroundColor: "blue",
            flexDirection: "row",
            justifyContent: "center",
            height: "20%",
            padding: 10,
          }}
        />
        <Text style={{ color: "green", fontSize: 16, fontWeight: "600" }}>
          Turning on Heroku please wait 3min ....
        </Text>
      </View>
    </View>
  );
};

export default Loader;

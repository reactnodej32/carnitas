import React, { useState } from "react";
import {
  Keyboard,
  Text,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-elements";
import deviceStorage from "../utils/jwt-storage";
import axios from "axios";
import jwt_decode from "jwt-decode";
export const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLoginPress = () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Please input a email and password", "", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    axios
      .post("https://carinitass.herokuapp.com/api/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        deviceStorage.saveKey("user", response.data.token);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Carna</Text>
            <TextInput
              placeholder="Username"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              onChangeText={(email) => setEmail(email)}
              defaultValue={email}
            />
            <TextInput
              placeholder="Password"
              placeholderColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              defaultValue={password}
              onSubmitEditing={() => onLoginPress()}
              returnKeyType="go"
            />
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => onLoginPress()}
              title="Login"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    // backgroundColor: "red",

    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
  },
  loginFormView: {
    width: "60%",
    // backgroundColor: "yellow",
    flex: 1,
  },
  logoText: {
    color: "white",
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: "center",
  },

  loginFormTextInput: {
    height: 43,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#eaeaea",
    backgroundColor: "#fafafa",
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  loginButton: {
    backgroundColor: "#3897f1",
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: "transparent",
  },
});
export default SignIn;

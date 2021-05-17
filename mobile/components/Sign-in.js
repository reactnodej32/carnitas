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

export const SignIn = ({ setPage, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLoginPress = async () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Please input a email and password", "", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    const {
      data: { token },
    } = await axios.post("https://carinitass.herokuapp.com/api/user/login", {
      email: email,
      password: password,
    });
    if (token) {
      deviceStorage.saveItem("user", token);
      history.push("/home");
    } else {
      console.log("no token");
    }

    // response
    // deviceStorage.saveItem("user", response.data.token);
    //catch
    // Alert.alert("Warning ", JSON.stringify(error.response.data), [
    //   { text: "OK", onPress: () => console.log("OK Pressed") },
    // ]);
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>
              {"\n"} Login to {"\n"}
              Carnitas!
            </Text>
            <TextInput
              placeholder="Email"
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
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => setPage(false)}
              title="Sign Up"
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
    width: "70%",
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

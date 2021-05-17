import { AsyncStorage } from "react-native";
//Slashed because deprecation
const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem("user");

      return value;
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
  async deleteJWT() {
    try {
      const remove = await AsyncStorage.removeItem("user");
      return remove;
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
};
export default deviceStorage;

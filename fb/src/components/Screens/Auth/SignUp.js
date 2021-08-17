import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert } from "react-native";
const initialState = { username: "", email: "", password: "" };
const SignUp = ({ navigation }) => {
  const [formData, setData] = useState(initialState);
  const handleChangeEmail = (e) => {
    setData({
      ...formData,
      email: e,
    });
  };
  const handleChangePassword = (e) => {
    setData({
      ...formData,
      password: e,
    });
  };
  const handleChangeFirstName = (e) => {
    setData({
      ...formData,
      username: e,
    });
  };
  const handleChangeLastName = (e) => {
    setData({
      ...formData,
      lastName: e,
    });
  };
  const handleSubmit = () => {
    axios
      .post("http://192.168.100.76:5000/api/auth/register/", formData)
      .then((res) => {
        AsyncStorage.setItem("user", JSON.stringify(res.data));
        navigation.navigate("navigation", { screen: "home" });
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.username)
          Alert.alert(`Username: ${error.response.data.username}`);
        else if (error.response.data.email) {
          Alert.alert(`Email: ${error.response.data.email}`);
        } else if (error.response.data.password) {
          Alert.alert(`Password: ${error.response.data.password}`);
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          source={require("../../../Images/background.jpg")}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
      </View>
      <KeyboardAvoidingView
        style={styles.bottomContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <View style={styles.name}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#757575"
              onChangeText={(text) => {
                handleChangeFirstName(text);
              }}
              style={styles.nameField}
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#757575"
              onChangeText={(e) => handleChangeLastName(e)}
              style={styles.nameField}
            ></TextInput>
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Phone number or email"
              placeholderTextColor="#757575"
              name="email"
              onChangeText={(text) => {
                handleChangeEmail(text);
              }}
              style={{
                height: 35,
                paddingLeft: 10,
                color: "#757575",
              }}
            ></TextInput>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#757575"
              name="password"
              onChangeText={(text) => {
                handleChangePassword(text);
              }}
              style={{
                borderColor: "#757575",
                borderTopWidth: 1,
                height: 35,
                paddingLeft: 10,
                color: "#757575",
              }}
            ></TextInput>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.signUpBtn}
            onPress={handleSubmit}
            disabled={
              !formData.username || !formData.email || !formData.password
            }
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.createBtnText}>Already Have an Account?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303030",
  },
  background: {
    width: "100%",
    height: 250,
  },
  itemPhoto: {
    width: "100%",
    height: 250,
  },
  bottomContainer: {
    padding: 10,
    marginTop: 20,
    height: "65%",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "column",
    width: "100%",
  },
  input: {
    flexDirection: "column",
    borderColor: "#757575",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15,
    backgroundColor: "#424242",
  },
  name: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  nameField: {
    width: "45%",
    borderColor: "#757575",
    borderWidth: 1,
    height: 35,
    paddingLeft: 10,
    color: "#757575",
    backgroundColor: "#424242",
    borderRadius: 5,
  },
  signUpBtn: {
    width: "100%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1777F2",
    marginTop: 15,
    borderRadius: 6,
  },
  signUpText: {
    color: "white",
    fontWeight: "bold",
  },
  text: {
    color: "#1777F2",
    fontWeight: "700",
  },
  createBtn: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  createBtnText: {
    color: "#1777F2",
    fontWeight: "700",
  },
  btnContainer: {
    height: "70%",
    justifyContent: "space-between",
  },
});

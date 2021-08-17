import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from "react-native";
const initialState = { username: "", email: "", password: "" };

const Login = ({ navigation }) => {
  const [formData, setData] = useState(initialState);
  const handleChangeEmail = (e) => {
    setData({
      ...formData,
      username: e,
    });
  };
  const handleChangePassword = (e) => {
    setData({
      ...formData,
      password: e,
    });
  };
  const handleSubmit = () => {
    axios
      .post("http://192.168.100.76:5000/api/auth/login/", formData)
      .then((res) => {
        AsyncStorage.setItem("user", JSON.stringify(res.data));
        navigation.navigate("navigation", { screen: "home" });
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.username)
          Alert.alert(`Username: ${error.response.data.username}`);
        else if (error.response.data.password) {
          Alert.alert(`Password: ${error.response.data.password}`);
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
        <View styles={styles.form}>
          <View style={styles.input}>
            <TextInput
              placeholder="Phone number or email"
              placeholderTextColor="#757575"
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
          <TouchableOpacity
            style={styles.logInBtn}
            onPress={handleSubmit}
            disabled={!formData.username || !formData.password}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
              Log In
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signupContainer}>
          <TouchableOpacity style={styles.forget}>
            <Text
              style={{ color: "#1777F2", fontWeight: "bold", fontSize: 15 }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={styles.createBtnText}>Create New Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "black",
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
  input: {
    flexDirection: "column",
    width: "100%",
    borderColor: "#757575",
    borderWidth: 1,
    borderRadius: 4,
  },

  logInBtn: {
    width: "100%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1777F2",
    marginTop: 15,
    borderRadius: 6,
  },
  signupContainer: {
    height: "70%",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  text: {
    color: "#1777F2",
  },
  createBtn: {
    width: "100%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1777F2",
    borderRadius: 6,
    marginBottom: 12,
  },
  createBtnText: {
    color: "white",
    fontWeight: "700",
  },
  forget: {
    marginTop: 15,
    alignSelf: "center",
  },
});

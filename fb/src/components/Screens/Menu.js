import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Header from "../Header";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../constant/actionTypes";
import { ScrollView } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import axios from "axios";

const Menu = ({ navigation }) => {
  const [user, setUser] = useState();
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    setUser(JSON.parse(jsonValue));
  };
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: LOGOUT });
    navigation.navigate("mainTab", { screen: "login" });
    setUser(null);
    /* axios
      .get("http://192.168.100.76:5000/api/auth/logout/")
      .then(async (res) => {
        await AsyncStorage.removeItem("user");
        navigation.navigate("mainTab", { screen: "login" });
        setUser(null);
      })
      .catch((error) => {
        console.log(error.response.data);
      }); */
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Header name={"Menu"} />
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.header}>
          <Avatar
            size="medium"
            rounded
            overlayContainerStyle={{ backgroundColor: "blue" }}
            title={user?.profile == null ? user?.username.charAt(0) : null}
            source={{
              uri: user?.profile
                ? "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                : null,
            }}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{user?.username}</Text>
            <Text style={{ fontWeight: "300", color: "#757575" }}>
              See your Profile
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    height: 70,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  nameContainer: {
    margin: 10,
  },
  name: {
    fontWeight: "600",
  },
  logoutContainer: {
    width: "100%",
    height: 50,
    padding: 10,
  },
  logoutBtn: {
    width: "100%",
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  logoutText: {
    color: "white",
  },
});

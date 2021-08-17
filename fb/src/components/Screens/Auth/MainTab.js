import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./Login";
import SignUp from "./SignUp";
import { createStackNavigator } from "@react-navigation/stack";

const MainTab = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerMode: "none" }}>
      <Stack.Screen name="login" component={Login}></Stack.Screen>
      <Stack.Screen name="signup" component={SignUp}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({});

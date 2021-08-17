import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Avatar, Icon, Divider } from "react-native-elements";
import Home from "./Screens/Home";
import Watch from "./Screens/Watch";
import Group from "./Screens/Group";
import Gaming from "./Screens/Gaming";
import Notification from "./Screens/Notification";
import Menu from "./Screens/Menu";
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="home"
                color={focused ? "#1777F2" : "#757575"}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Watch"
        component={Watch}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="ondemand-video"
                color={focused ? "#1777F2" : "#757575"}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Group"
        component={Group}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="group"
                color={focused ? "#1777F2" : "#757575"}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Gaming"
        component={Gaming}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="gamepad"
                color={focused ? "#1777F2" : "#757575"}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="notifications"
                color={focused ? "#1777F2" : "#757575"}
                size={30}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name="menu"
                color={focused ? "#1777F2" : "#757575"}
                size={30}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});

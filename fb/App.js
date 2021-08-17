import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./src/components/Navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./src/components/reducers/index";
import MainTab from "./src/components/Screens/Auth/MainTab";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const Stack = createStackNavigator();
  const store = createStore(reducers, compose(applyMiddleware(thunk)));
  const [user, setUser] = useState();
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    setUser(JSON.parse(jsonValue));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <StatusBar barStyles="dark-content" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {user ? (
            <Stack.Screen name="navigation" component={Navigation} />
          ) : (
            <Stack.Screen name="mainTab" component={MainTab} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
  },
});

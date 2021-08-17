import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "react-native-vector-icons";

const NewStatus = ({ navigation }) => {
  const [user, setUser] = useState();
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    setUser(JSON.parse(jsonValue));
  };
  useEffect(() => {
    getData();
  });
  return (
    <Modal>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Entypo name="cross" color="black" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <View style={styles.avatar}>
            <Avatar
              size="medium"
              rounded
              source={{
                uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
              }}
            />
          </View>
          <View style={styles.titleText}>
            <Text>Hi, {user?.result.name}</Text>
            <Text>What's on Your mind?</Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NewStatus;

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 10,
  },
});

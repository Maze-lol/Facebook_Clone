import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import { MaterialCommunityIcons } from "react-native-vector-icons";
const Header = ({ name }) => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.btnContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search" color="black" size={25} />
        </View>
        <View style={styles.messageContainer}>
          <MaterialCommunityIcons
            name="facebook-messenger"
            color="black"
            size={25}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 70,
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1777F2",
    fontFamily: "Helvetica Neue",
    left: 5,
  },
  btnContainer: {
    width: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    right: 5,
  },
  searchContainer: {
    width: 35,
    height: 35,
    borderRadius: 50,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
  },
});

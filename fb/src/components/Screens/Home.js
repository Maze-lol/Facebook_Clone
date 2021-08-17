import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "../Header";
import Post from "../Post";
import Status from "../Status";
import Stories from "../Stories";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View>
      <Header name={"facebook"} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Status />
        <Stories />
        <Post />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

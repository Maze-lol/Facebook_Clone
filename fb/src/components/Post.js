import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import { Avatar, Icon, Divider } from "react-native-elements";
import TimeAgo from "react-native-timeago";
import { useDispatch } from "react-redux";

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={styles.postHeader}>
        <View style={styles.user}>
          <Avatar
            size="medium"
            style={styles.avatar}
            rounded
            source={{
              uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            }}
          />
          <View style={styles.userDetails}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={{ fontWeight: "300", fontSize: 12, color: "#757575" }}>
              <TimeAgo time={item.time}></TimeAgo>
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="more-horiz" color="#757575" />
        </TouchableOpacity>
      </View>

      {item.caption !== null ? (
        <View style={styles.caption}>
          <Text>{item.caption}</Text>
        </View>
      ) : null}
      {item.photo !== null ? (
        <Image
          source={{
            uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
      ) : null}
      <View style={styles.reacted}>
        <View style={styles.likeContainer}>
          <View style={styles.like}>
            <Icon name="thumb-up" color="white" size={10} />
          </View>
          <Text style={styles.likeCount}>{item.like}</Text>
        </View>
        <View style={styles.reactedChild}>
          <Text style={styles.comment}>{item.comment} Comments</Text>
          <Text>{item.share} Shares</Text>
        </View>
      </View>
      <View style={styles.reactContainer}>
        <Divider orientation="horizontal" color="#757575" />
        <View style={styles.reactBtn}>
          <TouchableOpacity style={styles.flatBtn}>
            <Icon name="thumb-up-off-alt" color="#757575"></Icon>
            <Text style={styles.reactText}>Like</Text>
          </TouchableOpacity>
          <Divider orientation="vertical" color="#eeeeee" />
          <TouchableOpacity style={styles.flatBtn}>
            <Icon name="message" color="#757575"></Icon>
            <Text style={styles.reactText}>Comment</Text>
          </TouchableOpacity>
          <Divider orientation="vertical" color="#eeeeee" />
          <TouchableOpacity style={styles.flatBtn}>
            <Icon name="share" color="#757575"></Icon>
            <Text style={styles.reactText}>Share</Text>
          </TouchableOpacity>
          <Divider orientation="vertical" color="#eeeeee" />
        </View>
      </View>
    </View>
  );
};

const Post = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPost = () => {
    fetch("http://192.168.100.76:5000/posts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((users) => {
        setData(users);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <View style={styles.postContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <ListItem item={item} />}
        onRefresh={() => getPost()}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  postContainer: {},
  item: {
    marginTop: 10,
    backgroundColor: "white",
    paddingBottom: 5,
    paddingTop: 10,
  },
  postHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 12,
    paddingRight: 12,
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
  },
  avatar: {
    zIndex: 100,
    width: 40,
    height: 40,
    marginRight: 5,
  },
  itemText: {
    color: "black",
    fontWeight: "600",
  },
  caption: {
    padding: 12,
  },
  itemPhoto: {
    width: "100%",
    height: 400,
  },
  reacted: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  like: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: "#1777F2",
    alignItems: "center",
    justifyContent: "center",
  },
  reactedChild: {
    flexDirection: "row",
  },
  comment: {
    marginRight: 7,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 3,
  },
  reactContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  reactBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 40,
    paddingTop: 5,
    paddingBottom: 5,
  },
  flatBtn: {
    flexDirection: "row",
    alignItems: "center",
    width: 130,
    justifyContent: "center",
  },
  reactText: {
    color: "#757575",
  },
});

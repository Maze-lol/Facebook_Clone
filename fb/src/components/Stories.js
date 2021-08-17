import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <View
        style={
          item.isViewed || item.isAddStory
            ? styles.notViewedBorder
            : styles.viewedBorder
        }
      >
        {item.isAddStory ? (
          <View style={styles.circle}>
            <Icon name="add" color="#1777F2" type="MaterialIcons" size={30} />
          </View>
        ) : (
          <Avatar
            size="medium"
            style={styles.avatar}
            rounded
            source={{
              uri: item.imageUrl,
            }}
          />
        )}
      </View>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <View style={styles.userName}>
        <Text style={styles.userText} numberOfLines={1}>
          {item.isAddStory ? "Add a Story" : item.userName}{" "}
        </Text>
      </View>
    </View>
  );
};

const SECTIONS = [
  {
    horizontal: true,
    data: [
      {
        isAddStory: true,
        key: "1",
        user: "",
        uri: "https://picsum.photos/id/1/200",
      },
      {
        key: "2",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        uri: "https://picsum.photos/id/10/200",
        isViewed: true,
        userName: "Diluc Shrestha",
      },

      {
        key: "3",
        imageUrl:
          "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
        uri: "https://picsum.photos/id/1002/200",
        isViewed: false,
        userName: "Kamisato Ayaka",
      },

      {
        key: "4",
        imageUrl:
          "https://images.unsplash.com/photo-1497262693247-aa258f96c4f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=624&q=80",
        uri: "https://picsum.photos/id/1006/200",
        isViewed: true,
        userName: "Xiao Shrestha",
      },
      {
        key: "5",
        imageUrl:
          "https://images.unsplash.com/photo-1496950866446-3253e1470e8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
        uri: "https://picsum.photos/id/1008/200",
        isViewed: false,
        userName: "Raiden Shogen",
      },
    ],
  },
];

const Stories = () => {
  return (
    <View style={styles.StoriesContainer}>
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={SECTIONS}
        scrollEnabled={false}
        renderSectionHeader={({ section }) => (
          <>
            {section.horizontal ? (
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => <ListItem item={item} />}
                showsHorizontalScrollIndicator={false}
              />
            ) : null}
          </>
        )}
        renderItem={({ item, section }) => {
          if (section.horizontal) {
            return null;
          }
          return <ListItem item={item} />;
        }}
      />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  StoriesContainer: {
    height: 200,
    marginTop: 15,
    backgroundColor: "white",
    paddingTop: 4,
  },

  item: {
    margin: 5,
    borderRadius: 10,
  },
  itemPhoto: {
    width: 110,
    height: 180,
    borderRadius: 10,
  },
  viewedBorder: {
    position: "absolute",
    width: 43,
    height: 43,
    top: 8,
    left: 8,
    borderRadius: 50,
    zIndex: 100,
    backgroundColor: "#1777F2",
    justifyContent: "center",
    alignItems: "center",
  },
  notViewedBorder: {
    position: "absolute",
    left: 8,
    top: 8,
    zIndex: 100,
  },
  circle: {
    backgroundColor: "white",
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    zIndex: 100,
    position: "absolute",
    width: 40,
    height: 40,
  },
  userName: {
    width: 90,
    position: "absolute",
    bottom: 8,
    left: 8,
    zIndex: 100,
  },
  userText: {
    color: "white",
    fontWeight: "bold",
  },
});

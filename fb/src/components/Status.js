import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Modal,
  Image,
} from "react-native";
import { Avatar, Divider, Icon } from "react-native-elements";
import { Entypo } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { createPost } from "./actions/post";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
const Status = ({ navigation }) => {
  const [image, setImage] = useState();
  const initialState = { caption: "", photo: null };
  const dispatch = useDispatch();
  const [status, setStatus] = useState(initialState);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState();
  const getData = async () => {
    const jsonValue = await AsyncStorage.getItem("user");
    setUser(JSON.parse(jsonValue));
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    console.log(result);
    if (!result.cancelled) {
      const image = `data:image/png;base64,${result.base64}`;

      setStatus({ ...status, photo: image });
    }
  };
  useEffect(() => {
    getData();
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);
  const handleChange = (val) => {
    setStatus({ ...status, caption: val });
  };
  const handleSubmit = () => {
    dispatch(createPost({ ...status, name: user.username }));
    setModalVisible(!modalVisible);

    /* axios
      .post("http://192.168.100.76:5000/posts/", status)
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        setModalVisible(!modalVisible);
      })
      .catch((error) => {
        console.log(error.response.data);
      }); */
  };
  const closeModal = () => {
    setModalVisible(!modalVisible);
    setStatus(initialState);
  };
  return (
    <KeyboardAvoidingView style={styles.Container}>
      {console.log(status)}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.containerModal}>
          <View style={styles.header}>
            <TouchableOpacity onPress={closeModal}>
              <Entypo name="cross" color="black" size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit}>
              <Text
                style={{ color: "#1777F2", fontSize: 15, fontWeight: "bold" }}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <View style={styles.avatar}>
              <Avatar
                size="medium"
                rounded
                overlayContainerStyle={{ backgroundColor: "blue" }}
                source={
                  user?.uri
                    ? {
                        uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
                      }
                    : null
                }
              ></Avatar>
            </View>
            <View style={styles.titleText}>
              <Text style={{ fontSize: 20 }}>Hi, {user?.username}</Text>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                What's on Your mind?
              </Text>
            </View>
          </View>
          <KeyboardAvoidingView>
            <View style={styles.inputStatus}>
              <TextInput
                placeholder="Write Something...."
                placeholderTextColor="#757575"
                style={styles.status}
                multiline={true}
                numberOfLines={4}
                onChangeText={(val) => handleChange(val)}
              ></TextInput>
            </View>
          </KeyboardAvoidingView>
          <View>
            {status.photo ? (
              <Image
                style={{ width: "100%", height: 250, marginTop: 40 }}
                source={{ uri: status.photo }}
              ></Image>
            ) : null}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={pickImage}>
              <Text style={{ color: "#1777F2" }}>Choose a Photo</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      <View style={styles.mainStatus}>
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
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.input}>What's on your mind</Text>
        </TouchableOpacity>
      </View>
      <Divider orientation="horizontal" color="#eeeeee" />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.flatButton}
          onPress={() => {
            console.log("Video");
          }}
        >
          <Icon name="videocam" color="red" />
          <Text>Live</Text>
        </TouchableOpacity>
        <Divider orientation="vertical" color="#eeeeee" />
        <TouchableOpacity style={styles.flatButton}>
          <Icon name="photo" color="green" />
          <Text>Photos</Text>
        </TouchableOpacity>
        <Divider orientation="vertical" color="#eeeeee" />
        <TouchableOpacity style={styles.flatButton}>
          <Icon name="video-call" color="#E040FB" />
          <Text>Room</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Status;

const styles = StyleSheet.create({
  Container: {
    height: 100,
    backgroundColor: "white",
  },
  mainStatus: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  input: {
    margin: 8,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    height: 40,
  },
  flatButton: {
    flexDirection: "row",
    alignItems: "center",
    width: 130,
    height: 38,
    justifyContent: "center",
  },
  containerModal: {
    padding: 20,
  },
  header: {
    height: 50,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 25,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  titleText: {
    marginLeft: 10,
  },
  inputStatus: {
    padding: 12,
    height: 85,
    width: "100%",
  },
  status: {
    width: "100%",
    backgroundColor: "white",
    height: 85,
    borderRadius: 5,
    shadowColor: "#757575",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    marginTop: 25,
    backgroundColor: "red",
  },
});

import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Image,
  ToastAndroid,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Avatar, TextInput } from "react-native-paper";
import { userContext } from "../userContext";

const UploadAvatar = ({ navigation, route }) => {
  const { dispatch } = React.useContext(userContext);
  const [image, setImage] = useState(null);

  const uploadToServer = async () => {
    const data = new FormData();
    data.append("image", {
      uri: image,
      name: "uplad.jpg",
      type: "image/jpeg",
    });
    console.log(data);
    try {
      const test = await fetch(
        "https://api.imgbb.com/1/upload?key=38be174235c027271a826e60334002a0",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: data,
        }
      );
      const body = await test.json();
      const imageURI = body.data.url;

      Alert.alert("URI", JSON.stringify(body), [{ text: "Okk" }], {
        cancelable: true,
      });
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    async () => {
      if (Platform.OS !== "web") {
        const permisson = await ImagePicker.requestCameraPermissionsAsync();
        if (permisson !== "granted") {
          alert("Cant work without permission");
        }
      }
    };
  }, []);
  const pickImage = async () => {
    const imag = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(imag);
    if (!imag.cancelled) {
      dispatch({ type: "AVATAR", avatar: imag.uri });

      setImage(imag.uri);
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            borderRadius: 100,
            width: 200,
            height: 200,
          }}
        />
      ) : (
        <Avatar.Text
          label="KP"
          size={200}
          style={{
            marginRight: 5,
          }}
        />
      )}
      <Button mode="outlined" onPress={pickImage}>
        Upload Image
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          setImage(null);
        }}
      >
        Remove Image
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          uploadToServer();
        }}
      >
        Try
      </Button>
      <Button
        mode="outlined"
        onPress={() => {
          navigation.navigate("Chat");
        }}
      >
        test
      </Button>
    </View>
  );
};
export default UploadAvatar;

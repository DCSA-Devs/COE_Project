import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Menu, Provider } from "react-native-paper";
import { userContext } from "../userContext";

export default function UploadAvatar({ navigation }) {
  const { dispatch, state } = React.useContext(userContext);
  const [image, setImage] = useState(null);
  const [visible, isVisible] = React.useState(false);

  const uploadToServer = async () => {
    const data = new FormData();
    data.append("image", {
      uri: image,
      name: "uplad.jpg",
      type: "image/jpeg",
    });
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
      let body = await test.json();
      console.log(body);
      const imageURI = body.data.url;
      const server = await fetch(
        "https://coeproject.herokuapp.com/upload-avatar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "Student",
            email: state.user.email,
            avatar: imageURI,
          }),
        }
      );
      body = await server.json();
      console.log(body);
      // Alert.alert("URI", JSON.stringify(body), [{ text: "Okk" }], {
      //   cancelable: true,
      // });
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
      isVisible(false);
      uploadToServer();
    }
  };
  return (
    <Provider>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {
          <View>
            {state.avatar ? (
              <Image
                source={{ uri: state.avatar }}
                style={{
                  borderRadius: 100,
                  width: 200,
                  height: 200,
                }}
              />
            ) : (
              <Avatar.Text
                label={state.user.firstName[0] + state.user.lastName[0]}
                size={200}
                style={{
                  marginRight: 5,
                }}
              />
            )}
            <View
              style={{
                marginRight: 5,
                position: "absolute",
                left: 130,
                top: 150,
              }}
            >
              <Menu
                anchor={
                  <TouchableOpacity onPress={() => isVisible(true)}>
                    <Avatar.Icon
                      icon="pencil"
                      size={55}
                      style={{ backgroundColor: "red" }}
                      color="white"
                    />
                  </TouchableOpacity>
                }
                visible={visible}
                onDismiss={() => isVisible(false)}
              >
                <Menu.Item
                  icon="update"
                  title="Update"
                  onPress={() => pickImage()}
                />
                <Menu.Item icon="delete" title="Remove" onPress={() => {}} />
              </Menu>
            </View>
          </View>
        }

        <View>
          <View style={styles.field}>
            <Text style={styles.text}>First Name : </Text>
            <Text style={styles.text}>{state.user.firstName} </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.text}>Last Name : </Text>
            <Text style={styles.text}>{state.user.lastName} </Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.text}>Email :</Text>
            <Text style={styles.text}> {state.user.email}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.text}>Date Joined : </Text>
            <Text style={styles.text}>{state.user.dateJoined}</Text>
          </View>
        </View>
      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 20,
  },
  field: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "grey",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

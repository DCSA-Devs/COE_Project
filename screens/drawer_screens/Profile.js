import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Menu, Provider } from "react-native-paper";
import { userContext } from "../userContext";
import { Initials } from "../../shared/functions";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
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
      const imageURI = body.data.medium.url;
      const server = await fetch(
        "https://coeproject.herokuapp.com/upload-avatar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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

  useEffect(() => {
    if (image != null) {
      uploadToServer();
    }
  }, [image]);
  const pickImage = async () => {
    const imag = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });
    console.log(imag);
    if (!imag.cancelled) {
      dispatch({ type: "AVATAR", avatar: imag.uri });
      setImage(imag.uri);
      isVisible(false);
    }
  };
  return (
    <Provider>
      <View
        style={{
          flex: 1,
          alignItems: "stretch",
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: "#BB86FC",
            height: heightPercentageToDP("50%"),
            justifyContent: "center",
          }}
        >
          {state.avatar ? (
            <Image
              source={{ uri: state.avatar }}
              style={{
                height: heightPercentageToDP("50%"),
                width: widthPercentageToDP("100%"),
              }}
            />
          ) : (
            <Text
              style={{
                fontSize: widthPercentageToDP("30%"),
                fontWeight: "bold",
                color: "#563D74",
              }}
            >
              {Initials(state.user.name)}
            </Text>
          )}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: widthPercentageToDP("87%"),
            }}
          >
            <Menu
              anchor={
                <Ionicons
                  name="md-create"
                  onPress={() => isVisible(true)}
                  size={40}
                  color={state.avatar ? "white" : "#563D74"}
                />
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
        <View style={styles.container}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              borderBottomWidth: 2,
              marginVertical: 10,
              paddingBottom: 5,
            }}
          >
            {state.user.name}
          </Text>
          <View style={styles.field}>
            <Ionicons
              name="md-mail"
              color="black"
              size={26}
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.headerText}>Email</Text>
              <Text style={styles.text}>{state.user.email}</Text>
            </View>
          </View>
          <View style={styles.field}>
            <Ionicons
              name="md-call"
              color="black"
              size={26}
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.headerText}>Mobile</Text>
              <Text style={styles.text}>{state.user.mobile}</Text>
            </View>
          </View>
          <View style={styles.field}>
            <Ionicons
              name="md-calendar"
              color="black"
              size={26}
              style={styles.iconStyle}
            />
            <View>
              <Text style={styles.headerText}>Date Joined</Text>
              <Text style={styles.text}>
                {new Date(state.user.dateJoined).toDateString()}
              </Text>
            </View>
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
    flexDirection: "row",
    alignItems: "flex-end",
  },
  headerText: {
    color: "black",
    fontWeight: "bold",
  },
  iconStyle: {
    marginRight: 20,
  },
  container: {
    height: heightPercentageToDP("50%"),
    padding: 20,
  },
});

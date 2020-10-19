import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DepartmentScreen from "./drawer_screens/DepartmentScreen";
import VideoPlayerScreen from "./drawer_screens/VideoPlayerScreen";
import LectureVideo from "./drawer_screens/LectureVideo";
import Notes from "./drawer_screens/Notes";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Forgotps from "./Forgotps";
import DrawerNavigator from "./drawer_screens/drawerNavigator";
import UploadAvatar from "./drawer_screens/uploadAvatar";
import test from "./test";
import AsyncStorage from "@react-native-community/async-storage";

const Stack = createStackNavigator();

export default function StackNavigator() {
  console.log("StacNavigator Visited");
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [initials, setInitials] = useState("🔥");

  // React.useEffect(() => {
  //   console.log("User", user);
  //   console.log("Initials", initials);
  // }, [user, initials, screen]);

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        let userFetched = await AsyncStorage.getItem("user");
        if (userFetched) {
          userFetched = JSON.parse(userFetched);
          setUser(userFetched);
          setInitials(userFetched.firstName[0] + userFetched.lastName[0]);
        }
        const avatarFetched = await AsyncStorage.getItem("avatar");
        if (avatarFetched) {
          setAvatar(avatarFetched);
        }
      } catch (err) {
        console.log("Async Error", err);
      }
    };
    fetchdata();
  }, []);

  //Minimize the code by generating the stack through map
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          "SignIn"
          //user ? "DepartmentScreen" : "SignIn"
        }
        screenOptions={{
          headerStyle: {
            backgroundColor: "red",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () =>
            avatar ? (
              <Avatar.Image source={{ uri: avatar }} size={50} />
            ) : (
              <Avatar.Text
                label={initials}
                size={50}
                color="red"
                style={{
                  backgroundColor: "beige",
                  marginRight: 5,
                  shadowColor: "black",
                  shadowOpacity: 0.5,
                  shadowOffset: {
                    width: 2,
                    height: 2,
                  },
                }}
              />
            ),
        }}
      >
        <Stack.Screen
          name="Test"
          component={test}
          options={{
            title: "Test",
          }}
        />
        <Stack.Screen
          name="UplaodAvatar"
          component={UploadAvatar}
          options={{
            title: "Upload",
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            title: "SignIn",
            headerRight: false,
          }}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "Registeration form", headerRight: false }}
        />

        <Stack.Screen
          name="Forgotps"
          component={Forgotps}
          options={{ title: "Forgot password", headerRight: false }}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{
            title: "DrawerNavigator",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DepartmentScreen"
          component={DepartmentScreen}
          options={{
            title: "Department of Computer Science",
            headerLeft: false,
          }}
        />
        <Stack.Screen
          name="LectureVideo"
          component={LectureVideo}
          options={{ title: "Video Lectures" }}
        />
        <Stack.Screen
          name="Notes"
          component={Notes}
          options={{ title: "Subject Notes" }}
        />
        <Stack.Screen
          name="VideoPlayer"
          component={VideoPlayerScreen}
          options={{ title: "Player" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

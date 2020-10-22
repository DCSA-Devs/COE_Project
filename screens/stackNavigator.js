import React, { useState, useEffect } from "react";
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
import { userContext } from "./userContext";

const Stack = createStackNavigator();

export default function StackNavigator() {
  console.log("StacNavigator Visited");

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGNIN":
          return {
            user: action.user,
            avatar: null,
            initials: action.user.firstName[0] + action.user.lastName[0],
          };
        case "SIGNOUT":
          return {
            user: null,
            avatar: null,
            initials: null,
          };
      }
    },
    {
      user: null,
      avatar: null,
      initials: null,
    }
  );
  React.useLayoutEffect(() => {
    const fetchdata = async () => {
      try {
        let userFetched = await AsyncStorage.getItem("user");
        if (userFetched) {
          userFetched = JSON.parse(userFetched);
          dispatch({ type: "SIGNIN", user: userFetched });
        }
      } catch (err) {
        console.log("Async Error", err);
      }
    };
    fetchdata();
  }, []);

  //Minimize the code by generating the stack through map
  return (
    <userContext.Provider value={dispatch}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "red",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerRight: () =>
              state.avatar ? (
                <Avatar.Image source={{ uri: state.avatar }} size={50} />
              ) : (
                <Avatar.Text
                  label={state.initials}
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
          {state.user ? (
            <>
              <Stack.Screen
                name="DepartmentScreen"
                component={DepartmentScreen}
                options={{
                  title: "Department of Computer Science",
                }}
              />
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
                name="DrawerNavigator"
                component={DrawerNavigator}
                options={{
                  title: "DrawerNavigator",
                  headerShown: false,
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
            </>
          ) : (
            <>
              {1 > 5 ? (
                <Stack.Screen
                  name="Test"
                  component={test}
                  options={{
                    title: "Test",
                  }}
                />
              ) : null}
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

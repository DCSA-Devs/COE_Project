import React, { useState, useEffect } from "react";
import { Avatar } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DepartmentScreen from "../screens/drawer_screens/DepartmentScreen";
import VideoPlayerScreen from "../screens/drawer_screens/VideoPlayerScreen";
import LectureVideo from "../screens/drawer_screens/LectureVideo";
import Notes from "../screens/drawer_screens/Notes";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Forgotps from "../screens/Forgotps";
import Profile from "../screens/drawer_screens/Profile";
import AsyncStorage from "@react-native-community/async-storage";
import { userContext } from "../screens/userContext";
import tab from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function StackNavigator() {
  console.log("StacNavigator Visited");

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGNIN":
          return {
            user: action.user,
            avatar: action.user.profilePic,
          };
        case "SIGNOUT":
          return {
            user: null,
            avatar: null,
          };
        case "AVATAR":
          return {
            ...prevState,
            avatar: action.avatar,
          };
      }
    },
    {
      user: null,
      avatar: null,
    }
  );
  React.useEffect(() => {
    console.log(state);
  }, [state]);
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
    <userContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Profile"
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
                <Avatar.Image
                  style={{
                    marginRight: 5,
                    shadowColor: "black",
                    shadowOpacity: 0.5,
                    backgroundColor: "beige",
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                  }}
                  source={{ uri: state.avatar }}
                  size={50}
                />
              ) : (
                <Avatar.Text
                  label={state.user.firstName[0] + state.user.lastName[0]}
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
                component={DrawerNavigator}
                options={{
                  title: "Department of Computer Science",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: "Profile",
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
                    headerRight: false,
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

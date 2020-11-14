import React from "react";
import { Avatar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import VideoPlayerScreen from "../screens/drawer_screens/VideoPlayerScreen";
import LectureVideo from "../screens/drawer_screens/LectureVideo";
import Forum from "../screens/drawer_screens/Forum/Forum";
import Profile from "../screens/drawer_screens/Profile";
import Document from "../screens/drawer_screens/DocumentTemplate/DocumentFetch";
import { userContext } from "../screens/userContext";
import TabNavigator from "./TabNavigator";
import Syllabus from "../screens/drawer_screens/Syllabus/Syllabus";
import SyllabusRender from "../screens/drawer_screens/Syllabus/SyllabusRender";
import Question from "../screens/drawer_screens/Forum/Question";
import Contact from "../screens/contact";
import DepartmentChoose from "../screens/drawer_screens/DepartmentChoose";

import { Initials } from "../shared/functions";
const Stack = createStackNavigator();
export default function StackNavigator() {
  const { state } = React.useContext(userContext);

  //Minimize the code by generating the stack through map
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#0077b6",
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
                label={Initials(state.user.name)}
                size={50}
                color="white"
                style={{
                  backgroundColor: "#fbc02d",
                  marginRight: 5,
                  borderColor: "#563D74",
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
        name="DepartmentChoose"
        component={DepartmentChoose}
        options={{ title: "Choose your Department" }}
      />

      <Stack.Screen
        name="DepartmentScreen"
        component={TabNavigator}
        options={{ title: "Department of Computer Science" }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerRight: false,
        }}
      />
      <Stack.Screen
        name="Document"
        component={Document}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />

      <Stack.Screen
        name="LectureVideo"
        component={LectureVideo}
        options={{ title: "Video Lectures" }}
      />
      <Stack.Screen
        name="Forum"
        component={Forum}
        options={{ title: "Forum" }}
      />
      <Stack.Screen
        name="Question"
        component={Question}
        options={{ title: "Question" }}
      />
      <Stack.Screen
        name="SyllabusRender"
        component={SyllabusRender}
        options={{ title: "Syllabus" }}
      />

      <Stack.Screen
        name="Syllabus"
        component={Syllabus}
        options={{ title: "Syllabus" }}
      />
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          title: "Contact us"
        }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={{ title: "Player" }}
      />
    </Stack.Navigator>
  );
}

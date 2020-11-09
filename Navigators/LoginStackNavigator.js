import React from "react";
import { Avatar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import VideoPlayerScreen from "../screens/drawer_screens/VideoPlayerScreen";
import LectureVideo from "../screens/drawer_screens/LectureVideo";
import Forum from "../screens/drawer_screens/Forum/Forum";
import Profile from "../screens/drawer_screens/Profile";
import OldExamPapers from "../screens/drawer_screens/DocumentTemplate/DocumentFetch";
import { userContext } from "../screens/userContext";
import TabNavigator from "./TabNavigator";
import Syllabus from "../screens/drawer_screens/Syllabus/Syllabus";
import SyllabusRender from "../screens/drawer_screens/Syllabus/SyllabusRender";
import Question from "../screens/drawer_screens/Forum/Question";
import Contact from "../screens/contact";
import ContactDetails from "../screens/contactDetails";

import { Initials } from "../shared/functions";
const Stack = createStackNavigator();
export default function StackNavigator({ navigation }) {
  const { state } = React.useContext(userContext);

  //Minimize the code by generating the stack through map
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
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
              color="#563D74"
              style={{
                backgroundColor: "#BB86FC",
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
        name="DepartmentScreen"
        component={TabNavigator}
        options={({ navigation, route }) => {
          return {
            title: "Department of Computer Science",
          };
        }}
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
        name="OldExamPapers"
        component={OldExamPapers}
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
        options={{ title: "Contact" }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetails}
        options={{ title: "Contact Details" }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={{ title: "Player" }}
      />
    </Stack.Navigator>
  );
}

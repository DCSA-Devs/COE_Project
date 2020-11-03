import React from "react";
import { Avatar } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import VideoPlayerScreen from "../screens/drawer_screens/VideoPlayerScreen";
import LectureVideo from "../screens/drawer_screens/LectureVideo";
import Forum from "../screens/drawer_screens/Forum/Forum";
import Notes from "../screens/drawer_screens/Notes";
import Profile from "../screens/drawer_screens/Profile";
import { userContext } from "../screens/userContext";
import TabNavigator from "./TabNavigator";
import { FontAwesome } from "@expo/vector-icons";
import Syllabus from "../screens/drawer_screens/Syllabus/Syllabus";
import SyllabusRender from "../screens/drawer_screens/Syllabus/SyllabusRender";
import Question from "../screens/drawer_screens/Forum/Question";
import initials from "../functions/initials";
const Stack = createStackNavigator();
export default function StackNavigator({ navigation }) {
  const { state } = React.useContext(userContext);

  //Minimize the code by generating the stack through map
  return (
    <Stack.Navigator
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
              label={initials(state.user.name)}
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
            headerLeft: () => (
              <FontAwesome
                name="bars"
                onPress={() => navigation.openDrawer()}
                size={35}
                style={{ marginLeft: 15 }}
                color="black"
              />
            ),
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
        name="Notes"
        component={Notes}
        options={{ title: "Subject Notes" }}
      />
      <Stack.Screen
        name="Syllabus"
        component={Syllabus}
        options={{ title: "Syllabus" }}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={{ title: "Player" }}
      />
    </Stack.Navigator>
  );
}

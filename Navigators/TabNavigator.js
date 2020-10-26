import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import DeaprtmentScreen from "../screens/drawer_screens/DepartmentScreen";
import Settings from "../screens/Settings";
import Chat from "../screens/Chat";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="DepartmentScreen"
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "gray",
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Chat") {
            iconName = focused ? "chat" : "chat-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={DeaprtmentScreen} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

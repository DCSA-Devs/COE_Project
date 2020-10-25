import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
import DeaprtmentScreen from "./DepartmentScreen";
import Settings from "../Settings";
import Chat from "../Chat";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="DepartmentScreen"
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "gray",
      }}
      screenOptions={{}}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => <Ionicons name="md-home" size={32} color="red" />,
        }}
        component={DeaprtmentScreen}
      />
      <Tab.Screen
        name="Chat"
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-chatboxes" size={32} color="red" />
          ),
        }}
        component={Chat}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-settings" size={32} color="red" />
          ),
        }}
        component={Settings}
      />
    </Tab.Navigator>
  );
}

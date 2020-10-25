import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, List } from "react-native-paper";
import { userContext } from "./userContext";
import AsyncStorage from "@react-native-community/async-storage";

export default function Settings({ navigation }) {
  const { dispatch } = React.useContext(userContext);

  return (
    <View>
      <List.Subheader>Settings</List.Subheader>
      <List.Item
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
        left={() => <List.Icon icon="account" />}
      />
      <List.Item
        title="Logout"
        onPress={async () => {
          await AsyncStorage.clear();
          dispatch({ type: "SIGNOUT" });
        }}
        left={() => <List.Icon icon="logout" />}
      />
    </View>
  );
}

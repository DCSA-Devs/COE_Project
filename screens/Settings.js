import React from "react";
import { View } from "react-native";
import { List, Divider } from "react-native-paper";
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
        left={() => <List.Icon icon="account" color="#3d5a80" />}
        right={() => <List.Icon icon="menu-right" />}
      />
      <Divider />
      <List.Item
        title="Contact"
        onPress={() => navigation.navigate("Contact")}
        left={() => <List.Icon icon="contacts" color="#3d5a80" />}
        right={() => <List.Icon icon="menu-right" />}
      />
      <Divider />
      <List.Item
        title="Logout"
        onPress={async () => {
          await AsyncStorage.clear();
          dispatch({ type: "SIGNOUT" });
        }}
        left={() => <List.Icon icon="logout" color="#3d5a80" />}
        right={() => <List.Icon icon="menu-right" />}
      />
    </View>
  );
}

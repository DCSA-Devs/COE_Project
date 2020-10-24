//Respon
import React from "react";
import { Avatar } from "react-native-paper";
import {
  Button,
  View,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { userContext } from "../../screens/userContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
export default function DrawerHeader({ drawerHandler, title }) {
  const { state } = React.useContext(userContext);
  return (
    <View style={styles.viewStyle}>
      <TouchableOpacity onPress={() => drawerHandler()}>
        {/* Add icon instead of 'choose subject */}
        <FontAwesome
          name="bars"
          size={35}
          style={{ marginLeft: 15 }}
          color="white"
        />
      </TouchableOpacity>
      <Text style={styles.titleStyle}>{title}</Text>
      {state.avatar ? (
        <Avatar.Image
          style={{
            marginRight: 5,
            backgroundColor: "beige",
            shadowColor: "black",
            shadowOpacity: 0.5,
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
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  viewStyle: {
    height: 65,
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
});

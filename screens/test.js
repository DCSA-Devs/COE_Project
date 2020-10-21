import React from "react";
import { View, Text, Button } from "react-native";
import { Avatar } from "react-native-paper";
import * as SQLite from "expo-sqlite";
import { userContext } from "./userContext";
const initState = 0;
const reducer = (state, action) => {
  switch (action) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    case "RES":
      return 0;
    default:
      throw new Error("Unexpected Action");
  }
};
export default function App(navigation) {
  const [count, dispatch] = React.useReducer(reducer, initState);
  const { setInitials } = React.useContext(userContext);
  // console.log("Bhai kar gya", setUser);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Click"
        onPress={() => {
          setInitials("😂");
        }}
      ></Button>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 10,
          color: "red",
        }}
      >
        {count}
      </Text>
      <Button
        title="Increment"
        onPress={() => {
          dispatch("INC");
        }}
      />
      <Button
        title="Decrement"
        onPress={() => {
          dispatch("DEC");
        }}
      />
      <Button
        title="Reset"
        onPress={() => {
          dispatch("RES");
        }}
      />
    </View>
  );
}

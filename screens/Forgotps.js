import React from "react";
import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Logo from "../components/Logo";

export default function Forgetps({ navigation }) {
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <Logo />
        <View style={styles.headtitle}>
          <Text style={styles.head}>Trouble logging in ?{"\n"}</Text>
          <Text>Enter your email and we will send</Text>
          <Text>
            a link to get into your account{"\n"}
            {"\n"}
          </Text>
          <TextInput style={styles.input} mode="outlined" label="Email" />

          <View style={styles.btn}>
            <Button mode="contained">Send Login Link</Button>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  headtitle: { justifyContent: "center", alignItems: "center" },
  head: {
    fontWeight: "bold",
    fontSize: 15,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    color: "#2196F3",
  },
  input: {
    fontSize: 15,
    height: 50,
    width: 320,
  },
  btn: {
    padding: 18,
    color: "blue",
    width: "60%",
    borderRadius: 10,
    height: "15%",
    margin: 5,
  },
});

import React from "react";
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Logo from "../components/Logo";

export default function Forgetps({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <Logo />
          <View style={styles.headtitle}>
            <Text style={styles.head}>Trouble logging in ?{"\n"}</Text>
            <Text >Enter your email and we will send</Text>
            <Text>
              a link to get into your account{"\n"}
              {"\n"}
            </Text>
            <TextInput style={styles.input} mode="outlined" label="Email" />

            <View style={styles.btn}>
              <Button mode="contained" color="#d62828">Send Login Link</Button>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    color: "#d62828"
  },
  headtitle: { justifyContent: "center", alignItems: "center" },
  head: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#303F9F",
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
    color: "#d62828",
    width: "60%",
    borderRadius: 10,
    height: "15%",
    margin: 5,
  },
});

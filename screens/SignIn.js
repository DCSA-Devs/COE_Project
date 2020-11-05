import React from "react";
import {
  Alert,
  StyleSheet,
  ToastAndroid,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import { Button, TextInput } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Logo from "../components/Logo";
import AsyncStorage from "@react-native-community/async-storage";
import { userContext } from "./userContext";

export default function SignIn({ navigation }) {
  const { dispatch } = React.useContext(userContext);
  console.log("SignIn visited");

  const [isDisabled, setDisabled] = React.useState(false);

  const Toast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const failAlert = () => {
    Alert.alert(
      "Login Failed",
      "Make sure credentials are correct",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: true }
    );
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView behavior="height">
        <Logo />
        <View style={styles.container}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              // Trim whitespaces
              values.email = values.email.trim();
              values.password = values.password.trim();

              // Disable buttons and inputs
              setDisabled(true);

              //post data to server
              try {
                const url = "http://localhost:3000/login";
                const url2 = "https://coeproject.herokuapp.com/login";
                const req = await fetch(url2, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                });
                // If user not found
                if (req.status != 200) {
                  failAlert();
                  setDisabled(false);
                } else {
                  const user = await req.json();
                  console.log("User", user);
                  // save user to offline storage
                  const res = await AsyncStorage.setItem(
                    "user",
                    JSON.stringify(user)
                  );
                  console.log("Login respose :", res);
                  // Toast("Login Successfull");
                  dispatch({ type: "SIGNIN", user });
                }
              } catch (e) {
                console.log(e);
                // Toast("Check your internet connection");
                setDisabled(false);
              }
            }}
          >
            {(props) => (
              //Sign In form

              <View style={{ alignSelf: "stretch", padding: "7%" }}>
                <Text style={styles.title}>Sign In</Text>
                <TextInput
                  style={styles.TextInput}
                  label="E-Mail"
                  mode="outlined"
                  disabled={isDisabled}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
                <TextInput
                  style={styles.TextInput}
                  label="Password"
                  mode="outlined"
                  disabled={isDisabled}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry={true}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ alignSelf: "center", margin: 5, color: "#2196F3" }}
                    onPress={() => navigation.push("SignUp")}
                  >
                    Create Account
                  </Text>

                  <Text
                    style={{ color: "#2196F3" }}
                    onPress={() => navigation.push("Forgotps")}
                  >
                    Forgot password ?
                  </Text>
                </View>
                <Button
                  icon="login"
                  mode="contained"
                  color="red"
                  disabled={isDisabled}
                  style={{ marginTop: 10, marginBottom: 10 }}
                  loading={isDisabled}
                  onPress={props.handleSubmit}
                >
                  {isDisabled ? "LOGGING YOU IN" : "LOGIN"}
                </Button>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

//styling
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: heightPercentageToDP("45%"),
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: widthPercentageToDP("6%"),
    color: "#2196F3",
  },
  TextInput: {
    marginBottom: 5,
  },
});

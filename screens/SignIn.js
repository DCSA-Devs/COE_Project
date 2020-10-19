import React, { useEffect } from "react";
import {
  Alert,
  StyleSheet,
  ToastAndroid,
  View,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import { Button, TextInput } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Logo from "../components/Logo";
import AsyncStorage from "@react-native-community/async-storage";

export default function SignIn({ navigation }) {
  console.log("SignIn visited");
  /* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox.Android disabled={isDisabled} status={checkbox} onPress={toogleCheckBox} />
                                    <Text style={{ color: '#2196F3' }} onPress={() => navigation.push('Forgotps')}>Remember Me</Text>
                                </View>
                                <Text style={{ color: '#2196F3' }} onPress={() => navigation.push('Forgotps')}>Forgot password ?</Text>
                            </View>
                            <Button icon="login" mode="contained" disabled={isDisabled} style={{ marginTop: 10, marginBottom: 10 }} loading={isDisabled} onPress={props.handleSubmit}>{isDisabled ? "LOGGING YOU IN" : "LOGIN"}</Button>
                            <Divider />
                            <Text style={{ alignSelf: 'center', fontWeight: 'bold', color: '#2196F3' }} onPress={() => navigation.push('SignUp')}>Create Account</Text>
                        </View>*/
  const [isDisabled, setDisabled] = React.useState(false);
  // const [checkbox, setCheckbox] = React.useState("unchecked")
  // const toogleCheckBox = () => {
  //     if (checkbox === 'checked')
  //         setCheckbox('unchecked')
  //     else
  //         setCheckbox("checked")
  // }

  // })
  //   let userFetched = await AsyncStorage.getItem("user");
  //   if (userFetched) {
  //     userFetched = JSON.parse(userFetched);
  //     console.log("User Fetched", userFetched);
  //   }

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
    <KeyboardAvoidingView behavior="height">
      <View style={styles.container}>
        <Logo />
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            setDisabled(true);
            try {
              const req = await fetch(
                "https://coeproject.herokuapp.com/login",
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                }
              );
              if (req.status != 200) {
                failAlert();
              } else {
                const user = await req.json();
                console.log("User", user);
                const res = await AsyncStorage.setItem(
                  "user",
                  JSON.stringify(user)
                );
                console.log("Login respose :", res);
                //Toast('Login Successfull')
                navigation.push("DepartmentScreen");
              }
            } catch (e) {
              console.log(e);
              // Toast('Check your internet connection')
            }
            setDisabled(false);
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
  );
}

//styling
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    alignItems: "center",
    height: heightPercentageToDP("100%"),
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

import React, { useCallback } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  ImageBackground,
  Text,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { Button } from "react-native-paper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

import { userContext } from "./userContext";

export default function SignIn({ navigation }) {
  console.log("SignIn visited");

  const { dispatch } = React.useContext(userContext);
  const [buttonsDisable, setButtonDisable] = React.useState(false);

  const verifyloginCredentials = useCallback(async (formValues) => {
    //alert when login fails
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

    const url = "https://coeproject.herokuapp.com/login";

    // Disable buttons and inputs
    setButtonDisable(true);
    //post data to server
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      // If user not found
      if (res.status != 200) {
        failAlert();
        setButtonDisable(false);
      } else {
        const user = await res.json();
        console.log("User Fetcehd From AsyncStorage", user);
        // save user to offline storage
        await AsyncStorage.setItem("user", JSON.stringify(user));
        // Toast("Login Successfull");
        dispatch({ type: "SIGNIN", user });
      }
    } catch (e) {
      console.log(e);
      // Toast("Check your internet connection");
      setButtonDisable(false);
    }
  }, []);
  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          alignContent: "center",
        }}
      >
        <StatusBar backgroundColor="red" />
        <View
          style={{
            height: heightPercentageToDP("40%"),
          }}
        >
          <ImageBackground
            source={require("../assets/images/puheader.jpg")}
            style={styles.image}
          />
        </View>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            // Trim whitespaces
            console.log(values);
            values.email = values.email.trim();
            values.password = values.password.trim();
            verifyloginCredentials(values);
          }}
        >
          {(props) => (
            //Sign In form
            <View
              style={{
                height: heightPercentageToDP("60%"),
                justifyContent: "space-evenly",
                alignItems: "center",
                // borderWidth: 2,
                // borderTopLeftRadius: 30,
                // borderTopRightRadius: 30,
              }}
            >
              <Text style={styles.title}>Sign In</Text>
              <View style={styles.TextInputView}>
                <Image
                  source={require("../assets/images/email.png")}
                  style={styles.icon}
                />
                <TextInput
                  placeholder="Email Address"
                  disabled={buttonsDisable}
                  style={styles.TextInput}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
              </View>
              <View style={styles.TextInputView}>
                <Image
                  source={require("../assets/images/key.png")}
                  style={styles.icon}
                />

                <TextInput
                  placeholder="Password"
                  disabled={buttonsDisable}
                  style={styles.TextInput}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry={true}
                />
              </View>

              <Button
                icon="login"
                mode="contained"
                color="red"
                disabled={buttonsDisable}
                style={styles.button}
                loading={buttonsDisable}
                onPress={props.handleSubmit}
              >
                {buttonsDisable ? "LOGGING YOU IN" : "LOGIN"}
              </Button>

              <TouchableOpacity
                onPress={() => navigation.push("Forgotps")}
                disabled={buttonsDisable}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: buttonsDisable ? "grey" : "#2196F3",
                  }}
                >
                  Forgot password ?
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.push("SignUp")}
                  disabled={buttonsDisable}
                >
                  <Text
                    style={{
                      marginLeft: 2,
                      fontWeight: "bold",
                      color: buttonsDisable ? "grey" : "#2196F3",
                    }}
                  >
                    Sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

//styling
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: widthPercentageToDP("6%"),
    color: "#2196F3",
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 10,
    alignSelf: "center",
    tintColor: "#808080",
  },
  TextInputView: {
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
    width: widthPercentageToDP("80%"),
  },
  TextInput: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    width: widthPercentageToDP("80%"),
  },
  image: {
    marginTop: 10,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

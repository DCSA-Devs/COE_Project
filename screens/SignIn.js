import React, { useCallback } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
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
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Logo
          style={{
            flex: 1,
            justifyContent: "space-evenly",
          }}
          textStyle={{ padding: 3 }}
          imageStyle={{ marginTop: 10 }}
        />
        <View style={styles.container}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              // Trim whitespaces
              values.email = values.email.trim();
              values.password = values.password.trim();
              verifyloginCredentials(values);
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
                  disabled={buttonsDisable}
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
                <TextInput
                  style={styles.TextInput}
                  label="Password"
                  mode="outlined"
                  disabled={buttonsDisable}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  secureTextEntry={true}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 10,

                  }}
                >
                  <TouchableOpacity
                    onPress={() => navigation.push("SignUp")}
                    disabled={buttonsDisable}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: buttonsDisable ? "grey" : "#303F9F"
                      }}
                    >
                      Create Account
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.push("Forgotps")}
                    disabled={buttonsDisable}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: buttonsDisable ? "grey" : "#303F9F"
                      }}
                    >
                      Forgot password ?
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button
                  icon="login"
                  mode="contained"
                  color="#FFA000"
                  disabled={buttonsDisable}
                  style={{ marginTop: 10 }}
                  loading={buttonsDisable}
                  onPress={props.handleSubmit}
                >
                  {buttonsDisable ? "LOGGING YOU IN" : "LOGIN"}
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
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: widthPercentageToDP("6%"),
    color: "#303F9F",
  },
  TextInput: {
    marginBottom: 5,
  },
});

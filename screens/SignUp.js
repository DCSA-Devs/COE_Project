import React, { useState, useCallback } from "react";
import { Alert, StyleSheet, View, Text, ScrollView } from "react-native";
import { ErrorMessage, Formik } from "formik";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Logo from "../components/Logo";
import { TextInput, Button, Chip } from "react-native-paper";
import * as yup from "yup";

export default function SignUp({ navigation }) {
  const [isDisabled, setDisabled] = useState(false);
  const [chipValue, setChipValue] = useState("Student");

  const registerUser = useCallback(async (formData) => {
    const failAlert = (errorMessage) => {
      Alert.alert(
        "Error!",
        errorMessage,
        [
          {
            text: "Ok",
          },
        ],
        { cancelable: true }
      );
    };
    setDisabled(true);
    delete formData.confirm_password;
    const url = "https://coeproject.herokuapp.com/register";
    try {
      const req = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (req.status != 200) {
        const error = await req.json();
        failAlert(JSON.stringify(error.message));
      } else {
        // Toast("Account created");
        navigation.navigate("SignIn");
      }
    } catch (err) {
      setDisabled(false);
      // Toast("Unable to connect to server");
    }
  }, []);

  //validations
  const reviewformschema = yup.object({
    name: yup.string().required().min(4),
    email: yup.string().required().email(),
    mobile: yup.string().required().min(10).max(10),
    password: yup.string().required().min(8),
    confirm_password: yup
      .string()
      .required()
      .min(8)
      .test("passwords-match", "Passwords must match ", function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    //Sign Up form

    <ScrollView>
      <Logo style={{ padding: 20 }} text />
      <Formik
        sty
        initialValues={{
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={reviewformschema}
        onSubmit={(values) => {
          if (chipValue === "Teacher") {
            values.isTeacher = true;
          }
          registerUser(values);
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Chip
                selected={chipValue === "Student" ? true : false}
                onPress={() => {
                  setChipValue("Student");
                }}
                mode="outlined"
              >
                Student
              </Chip>
              <Chip
                selected={chipValue === "Teacher" ? true : false}
                onPress={() => {
                  setChipValue("Teacher");
                }}
                mode="outlined"
              >
                Teacher
              </Chip>
            </View>

            <TextInput
              mode="outlined"
              style={styles.input}
              label="Name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              onBlur={props.handleBlur("name")}
              disabled={isDisabled}
            />
            <Text style={styles.errorText}>
              {props.touched.name && props.errors.name}
            </Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="E-mail "
              onChangeText={props.handleChange("email")}
              value={props.values.email}
              onBlur={props.handleBlur("email")}
              disabled={isDisabled}
            />
            <Text style={styles.errorText}>
              {props.touched.email && props.errors.email}
            </Text>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Mobile No."
              onChangeText={props.handleChange("mobile")}
              value={props.values.mobile}
              keyboardType="numeric"
              onBlur={props.handleBlur("mobile")}
              disabled={isDisabled}
            />
            <Text style={styles.errorText}>
              {props.touched.mobile && props.errors.mobile}
            </Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Password"
              onChangeText={props.handleChange("password")}
              value={props.values.password}
              onBlur={props.handleBlur("password")}
              disabled={isDisabled}
              secureTextEntry={true}
            />
            <Text style={styles.errorText}>
              {props.touched.password && props.errors.password}
            </Text>
            <TextInput
              mode="outlined"
              style={styles.input}
              label="Confirm Password"
              onChangeText={props.handleChange("confirm_password")}
              value={props.values.confirm_password}
              onBlur={props.handleBlur("confirm_password")}
              disabled={isDisabled}
              secureTextEntry={true}
            />
            <Text style={styles.errorText}>
              {props.touched.confirm_password && props.errors.confirm_password}
            </Text>
            <Button
              mode="contained"
              style={{ margin: 10 }}
              disabled={isDisabled}
              loading={isDisabled}
              onPress={props.handleSubmit}
              color="#d62828"
              fontWeight="bold"
            >
              {isDisabled ? "Creating Account" : "Create Account"}
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

//styling
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: widthPercentageToDP("1%"),
  },
  input: {
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    color: "black",
    width: widthPercentageToDP("85%"),
    height: heightPercentageToDP("7%"),
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    textAlign: "center",
  },
});

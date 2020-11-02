import React, { useState } from "react";
import {
  Alert,
  ToastAndroid,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { ErrorMessage, Formik } from "formik";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import Logo from "../components/Logo";
import {
  RadioButton,
  TextInput,
  Button,
  Chip,
  Avatar,
} from "react-native-paper";
import * as yup from "yup";

export default function SignUp({ navigation }) {
  const [isDisabled, setDisabled] = useState(false);
  const [chipValue, setChipValue] = useState("");
  const Toast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const failAlert = (errorMessage) => {
    Alert.alert(
      "Error!",
      errorMessage,
      [
        {
          text: "OK",
        },
      ],
      { cancelable: true }
    );
  };
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Logo style={{ padding: 20 }} />
      <Formik
        initialValues={{
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={reviewformschema}
        onSubmit={async (values) => {
          setDisabled(true);
          values.profession = chipValue.toString();
          console.log(values.profession);
          const req = await fetch("https://coeproject.herokuapp.com/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (req.status != 200) {
            const error = await req.json();
            failAlert(JSON.stringify(error.message));
          } else {
            // Toast("Account created");
            navigation.navigate("SignIn");
          }
          setDisabled(false);
        }}
      >
        {(props) => (
          <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
            {1 > 5 ? (
              <RadioButton.Group
                onValueChange={(value) => setValue(value)}
                value={value}
              >
                <View style={{ flexDirection: "row" }}>
                  <RadioButton
                    value="Student"
                    onPress={(value) => setValue(value)}
                  />
                  <Text style={{ marginTop: 6 }}>I am student</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton
                    value="Teacher"
                    onPress={(value) => setValue(value)}
                  />
                  <Text style={{ marginTop: 6 }}>I am Teacher</Text>
                </View>
              </RadioButton.Group>
            ) : null}
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
              label="E-mail id"
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
    flex: 1,
    height: heightPercentageToDP("70%"),
    justifyContent: "space-between",
    alignItems: "center",
    padding: widthPercentageToDP("1%"),
  },
  input: {
    backgroundColor: "#ddd",
    borderRadius: 10,
    color: "black",
    width: widthPercentageToDP("85%"),
    height: heightPercentageToDP("7%"),
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "#2196F3",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 2,
    textAlign: "center",
  },
});

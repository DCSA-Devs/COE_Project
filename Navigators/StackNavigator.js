import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Forgotps from "../screens/Forgotps";
import AsyncStorage from "@react-native-community/async-storage";
import { userContext } from "../screens/userContext";
import LoginStackNavigator from "./LoginStackNavigator";
import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
const Stack = createStackNavigator();
function SplashScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
        Loading...
      </Text>
      <ActivityIndicator size="large" />
    </View>
  );
}
export default function StackNavigator() {
  console.log("StacNavigator Visited");

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGNIN":
          return {
            user: action.user,
            avatar: action.user.profilePic,
            isLoading: false,
          };
        case "SIGNOUT":
          return {
            isLoading: false,
            user: null,
            avatar: null,
          };
        case "AVATAR":
          return {
            ...prevState,
            avatar: action.avatar,
          };
      }
    },
    {
      user: null,
      avatar: null,
      isLoading: true,
    }
  );
  React.useEffect(() => {
    console.log(state);
  }, [state]);
  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        let userFetched = await AsyncStorage.getItem("user");
        if (userFetched) {
          userFetched = JSON.parse(userFetched);
          dispatch({ type: "SIGNIN", user: userFetched });
        } else {
          dispatch({ type: "SIGNOUT" });
        }
      } catch (err) {
        console.log("Async Error", err);
      }
    };
    fetchdata();
  }, []);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#d62828",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
          {state.isLoading ? (
            <Stack.Screen
              name="loading"
              component={SplashScreen}
              options={{
                title: "Department of Computer Science",
                headerShown: false,
              }}
            />
          ) : state.user ? (
            <>
              <Stack.Screen
                name="loginStacknavigator"
                component={LoginStackNavigator}
                options={{
                  title: "Department of Computer Science",
                  headerShown: false,
                }}
              />
            </>
          ) : (
                <>
                  <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                      title: "SignIn",
                      headerShown: false,
                    }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ title: "Registeration form" }}
                  />
                  <Stack.Screen
                    name="Forgotps"
                    component={Forgotps}
                    options={{ title: "Forgot password" }}
                  />
                </>
              )}
        </Stack.Navigator>
      </NavigationContainer>
    </userContext.Provider>
  );
}

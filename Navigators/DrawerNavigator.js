import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LoginStackNavigator from "./LoginStackNavigator";
import ContactStack from './contactStack';
const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={LoginStackNavigator} />
      <Drawer.Screen name="Contact" component={ContactStack} />
    </Drawer.Navigator>
  );
}

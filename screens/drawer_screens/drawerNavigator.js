
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DownloadScreen from './DownloadSyllabus';
import DepartmentScreen from './DepartmentScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function drawerNavigator() {
  return (
    // Genrate subject drawer
    <Drawer.Navigator> 
    <Drawer.Screen name="Home" component={DepartmentScreen} />
    <Drawer.Screen name="DownloadSyllabus" component={DownloadScreen} />
  </Drawer.Navigator>
  );
}

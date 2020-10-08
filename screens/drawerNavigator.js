
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DownloadScreen from './drawer_screens/DownloadSyllabus';
import DepartmentScreen from './DepartmentScreen';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export function drawerNavigator() {
  return (
    // Genrate subject drawer
    <Drawer.Navigator> 
    <Drawer.Screen name="CS 00 Programming in C" component={DepartmentScreen} />
    <Drawer.Screen name="DownloadSyllabus" component={DownloadScreen} />
  </Drawer.Navigator>
  );
}

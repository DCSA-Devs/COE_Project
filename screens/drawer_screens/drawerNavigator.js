
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DownloadScreen from './DownloadSyllabus';
import DepartmentScreen from './DepartmentScreen';
import DepartmentHome from './DepartmentHome';
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
    {/* In the depararment home add the various department objects to render that deparment */}
    <Drawer.Screen name="Home" component={DepartmentHome} /> 
    <Drawer.Screen name="Resources" component={DepartmentScreen} />
    <Drawer.Screen name="DownloadSyllabus" component={DownloadScreen} />
  </Drawer.Navigator>
  );
}

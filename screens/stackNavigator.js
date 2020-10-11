import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DepartmentScreen from './drawer_screens/DepartmentScreen';
import VideoPlayerScreen from './drawer_screens/VideoPlayerScreen';
import LectureVideo from './drawer_screens/LectureVideo';
import Notes from './drawer_screens/Notes';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Forgotps from './Forgotps';
import DrawerNavigator from './drawer_screens/drawerNavigator';
const Stack = createStackNavigator();
export default function StackNavigator() {
  //Minimize the code by generating the stack through map
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SignIn'
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(66, 112, 142 )',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>

        <Stack.Screen
          name='SignIn'
          component={SignIn}
          options={{
            title: 'SignIn',
            headerShown: true,
          }
          }
        />

        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{ title: 'Registeration form', }}
        />

        <Stack.Screen
          name='Forgotps'
          component={Forgotps}
          options={{ title: 'Forgot password', }}
        />
        <Stack.Screen
          name='DrawerNavigator'
          component={DrawerNavigator}
          options={{
            title: 'DrawerNavigator',
            headerShown: false
          }}
        />
        <Stack.Screen
          name='DepartmentScreen'
          component={DepartmentScreen}
          options={{ title: 'Department of Computer Science', }}
        />
        <Stack.Screen
          name='LectureVideo'
          component={LectureVideo}
          options={{ title: 'Video Lectures' }}
        />
        <Stack.Screen
          name='Notes'
          component={Notes}
          options={{ title: 'Subject Notes' }}
        />
        <Stack.Screen
          name='VideoPlayer'
          component={VideoPlayerScreen}
          options={{ title: 'Player' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
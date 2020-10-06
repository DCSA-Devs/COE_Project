import React ,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import DepartmentScreen from './DepartmentScreen';
import VideoPlayerScreen from './VideoPlayerScreen';
import LectureVideo from './LectureVideo';
import Notes from './Notes';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Forgotps from './Forgotps';

const Stack = createStackNavigator();
export default function StackNavigator() {
//Minimize the code by generating the stack through map
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'
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
            title: 'Login',
          }
          }
        />

        <Stack.Screen
          name='SignUp'
          component={SignUp}
          options={{title: 'Registeration form',}}
        />

        <Stack.Screen
          name='Forgotps'
          component={Forgotps}
          options={{title: 'Forgot password',}}
        />

        <Stack.Screen
          name='DepartmentScreen'
          component={DepartmentScreen}
          options={{title: 'Department of Computer Science',}}
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
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import DepartmentScreen from './DepartmentScreen';
import VideoPlayerScreen from './VideoPlayerScreen';
import LectureVideo from './LectureVideo';
import Notes from './Notes';
const Stack = createStackNavigator();
export default function StackNavigator() {
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
          name='Login'
          component={LoginScreen}
          options={{
            title: 'Login',
          }
          }
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
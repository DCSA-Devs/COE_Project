import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DepartmentScreen from './DepartmentScreen';
import VideoPlayerScreen from './VideoPlayerScreen';
import LectureVideo from './LectureVideo';
import Notes from './Notes';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Forgotps from './Forgotps';
import DCSA from '../screens/DCSA';
import Department from '../screens/Department';
import ArtsDepartment from '../screens/ArtsDepartment';
import semesterScreen from '../screens/semesterScreen';
import ChemistryDepartment from '../screens/ChemistryDepartment';
import EngineeringDepartment from '../screens/EngineeringDepartment';
import EnglishDepartment from '../screens/EnglishDepartment';
import HindiDepartment from '../screens/HindiDepartment';
import HotelDepartment from '../screens/HotelDepartment';
import LawDepartment from '../screens/LawDepartment';
import McaHand from '../screens/McaHand';
import MscHand from '../screens/MscHand';
import {drawerNavigator,Toggle} from './drawerNavigator';

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
          options={{ title: 'Registeration form', }}
        />

        <Stack.Screen
          name='Forgotps'
          component={Forgotps}
          options={{ title: 'Forgot password', }}
        />
        <Stack.Screen
          name='Department'
          component={Department}
          options={{ title: 'Departments' }}
        />
        <Stack.Screen
          name='DCSA'
          component={DCSA}
          options={{ title: 'Computer Science Department' }}
        />
        <Stack.Screen
          name='McaHand'
          component={McaHand}
          options={{ title: 'Computer Science Department' }}
        />
        <Stack.Screen
          name='MscHand'
          component={MscHand}
          options={{ title: 'Computer Science Department' }}
        />
        <Stack.Screen
          name='ArtsDepartment'
          component={ArtsDepartment}
          options={{ title: 'Arts Department' }}
        />
        <Stack.Screen
          name='ChemistryDepartment'
          component={ChemistryDepartment}
          options={{ title: 'Chemistry Department' }}
        />
        <Stack.Screen
          name='EngineeringDepartment'
          component={EngineeringDepartment}
          options={{ title: 'Engineering and Technology' }}
        />
        <Stack.Screen
          name='EnglishDepartment'
          component={EnglishDepartment}
          options={{ title: 'English Department' }}
        />
        <Stack.Screen
          name='HindiDepartment'
          component={HindiDepartment}
          options={{ title: 'Hindi Department' }}
        />
        <Stack.Screen
          name='HotelDepartment'
          component={HotelDepartment}
          options={{ title: 'Hotel Management Department' }}
        />
        <Stack.Screen
          name='LawDepartment'
          component={LawDepartment}
          options={{ title: 'Law Department' }}
        />
        <Stack.Screen
          name='semesterScreen'
          component={semesterScreen}
          options={{ title: 'Semester' }}
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
        <Stack.Screen
          name='drawerNavigator'
          component={drawerNavigator}
          options={{ 
            title: 'DawerScreen',
            headerShown:false,
             }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
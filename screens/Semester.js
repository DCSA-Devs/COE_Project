import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default function Semester({ navigation }) {
  const pressHandler1 = () => {
    navigation.navigate('Semester_1');
  }
  const pressHandler2 = () => {
    navigation.navigate('Semester_2');
  }
  const pressHandler3 = () => {
    navigation.navigate('Semester_3');
  }
  const pressHandler4 = () => {
    navigation.navigate('Semester_4');
  }
  const pressHandler5 = () => {
    navigation.navigate('Semester_5');
  }
  const pressHandler6 = () => {
    navigation.navigate('Semester_6');
  }
  return (
    <View style={[styles.container, styles.a]}>
        <Button title={'Semester 1'} myColor={'aquamarine'}  onPress={pressHandler1}/>
        <Button title={'Semester 2'} myColor={'aquamarine'} onPress={pressHandler2}/>
        <Button title={'Semester 3'} myColor={'aquamarine'} onPress={pressHandler3}/>
        <Button title={'Semester 4'} myColor={'aquamarine'} onPress={pressHandler4}/>
        <Button title={'Semester 5'} myColor={'aquamarine'} onPress={pressHandler5}/>
        <Button title={'Semester 6'} myColor={'aquamarine'} onPress={pressHandler6}/>
        </View>
  )
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  a: {
    flex: 1,
    flexDirection: 'column',
  }
});
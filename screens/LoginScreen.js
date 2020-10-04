import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button title={'Login'} onPress={()=>navigation.push('DepartmentScreen')}/>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

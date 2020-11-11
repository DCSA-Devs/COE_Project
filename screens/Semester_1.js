import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component{
  render() {
    return(
      <View style={[styles.container, styles.a]}>
        <Button title={'CS-78 Programming in C'} myColor={'pink'} />
        <Button title={'CS-60 Computer Organization And Assembly Language'} myColor={'pink'} />
        <Button title={'CS-61 DBMS'} myColor={'pink'} />
        <Button title={'CS-75 Mathematical Structure in Computer Science'} myColor={'pink'} />
        <Button title={'CS-56 Linux Operating System'} myColor={'pink'} />
        <Button title={'CS-80 MOOC'} myColor={'pink'} />
        </View>
    );
  }
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal:10,
    justifyContent: 'space-around',
  },
  a: {
    padding: 10,
    fontSize: 20,
    marginHorizontal: 10,
  }
});
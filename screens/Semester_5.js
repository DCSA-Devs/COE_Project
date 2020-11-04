import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component{
  render() {
    return(
      <View style={[styles.container, styles.a]}>
        <Button title={'CS-17 Computer Based Optimization Techniques'} myColor={'pink'}/>
        <Button title={'CS-57 Software Project Management'} myColor={'pink'} />
        <Button title={'CS-58 Mobile Communication and Application Development '} myColor={'pink'} />
        <Button title={'CS-59 Soft Computing Techniques using Neural Networks'} myColor={'pink'} />
        <Button title={'CS-19 Seminar'} myColor={'pink'} />
        </View>
    );
  }
}
const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal:10,
    justifyContent: 'space-around',
  },
  a: {
    padding: 10,
    fontSize: 20,
    marginHorizontal: 10,
  }
});
import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component{
  render() {
    return(
      <View style={[styles.container, styles.a]}>
        <Button title={'CS-18 PROJECT WORK '} myColor={'pink'}/>
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
    marginTop: 10,
    marginHorizontal: 10,
  }
});
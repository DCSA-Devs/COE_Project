import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component{
  render() {
    return(
      <View style={[styles.container, styles.a]}>
        <Button title={'CS-79 Data Warehousing and Data Mining Techniques'} myColor={'pink'}/>
        <Button title={'CS-12 Interactive Computer Graphics'} myColor={'pink'} />
        <Button title={'CS-37 Theory of Computations'} myColor={'pink'} />
        <Button title={'CS-71 Artificial Intelligence (Using LISP)'} myColor={'pink'} />
        <Button title={'CS-72 Advanced Java and Network Programming'} myColor={'pink'} />
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
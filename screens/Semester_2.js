import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component{
  render() {
    return(
      <View style={[styles.container, styles.a]}>
        <Button title={'CS-63 Data and File Structures (Using C)'} myColor={'pink'}/>
        <Button title={'CS-64 OOP (Through C++ And Java) '} myColor={'pink'} />
        <Button title={'CS-48 Data Communication and Networks '} myColor={'pink'} />
        <Button title={'CS-76 Computer Based Numerical and Statistical Methods'} myColor={'pink'} />
        <Button title={'CS-07 Accounting and Financial Management '} myColor={'pink'} />
        <Button title={'CS-81 MOOC'} myColor={'pink'} />
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
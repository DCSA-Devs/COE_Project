import * as React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component{
  render() {
    return(
      <View style={[styles.container, styles.a]}>
        <Button title={'CS-65 Software Engineering '} myColor={'pink'}/>
        <Button title={'CS-66 Operating Systems  '} myColor={'pink'} />
        <Button title={'CS-67 Analysis and Design of Algorithms  '} myColor={'pink'} />
        <Button title={'CS-77 ASP.NET Using C#'} myColor={'pink'} />
        <Button title={'CS-69 Relational Data Base Management Systems'} myColor={'pink'} />
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
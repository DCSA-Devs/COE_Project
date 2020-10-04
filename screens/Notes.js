import React from 'react';
import {View,Text,StatusBar,StyleSheet,ImageBackground} from 'react-native';
import {globalStyles} from '../globalStyles';
export default function Notes(){
  return(
    <ImageBackground 
    style={styles.backStyle} 
    source={require('../assets/images/books.png')}>
      <Text>Hello</Text>
    </ImageBackground>
  );
}
const styles=StyleSheet.create({
  viewStyle:{
    flex:1,
    alignItems:'center',
  },
  textStyle:{
    fontFamily:"BlackOpsOne-Regular",
    fontSize:20,
  },
  backStyle:{
    flex:1
  }
})
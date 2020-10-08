//Respon
import React from 'react';
import {Button,View,Text,StatusBar,StyleSheet,ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function DrawerHeader({drawerHandler}){
  return(
    <View style={styles.viewStyle}>
        <TouchableOpacity onPress={()=> drawerHandler()}>
        {/* Add icon instead of 'choose subject */}
        <Text style={styles.textStyle}>Choose Subjects</Text> 
        </TouchableOpacity>
    </View>
  );
}
const styles=StyleSheet.create({
  viewStyle:{
    paddingTop:30,
    height:60,
    backgroundColor:'rgb(66, 112, 142 )',
  },
  textStyle:{
      fontWeight:'bold',
      color:'white',
      paddingLeft:10,
  }
})
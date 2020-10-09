//Respon
import React from 'react';
import {Button,View,Text,StatusBar,StyleSheet,ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
export default function DrawerHeader({drawerHandler}){
  return(
    <View style={styles.viewStyle}>
        <TouchableOpacity onPress={()=> drawerHandler()}>
        {/* Add icon instead of 'choose subject */}
        <FontAwesome style={styles.iconStyle} name="bars" size={35} color="white" /> 
        </TouchableOpacity>
    </View>
  );
}
const styles=StyleSheet.create({
  viewStyle:{
    paddingTop:30,
    height:70,
    backgroundColor:'rgb(66, 112, 142 )',
  },
  iconStyle:{
      paddingLeft:25,
  }
})
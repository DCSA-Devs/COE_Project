//Respon
import React from 'react';
import {Button,View,Text,StatusBar,StyleSheet,ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; 
export default function DrawerHeader({drawerHandler,title}){
  return(
    <View style={styles.viewStyle}>
        <TouchableOpacity onPress={()=> drawerHandler()}>
        {/* Add icon instead of 'choose subject */}
        <FontAwesome name="bars" size={35} color="white" /> 
        </TouchableOpacity>
        <Text style={styles.titleStyle}>{title}</Text>

    </View>
  );
}
const styles=StyleSheet.create({
  viewStyle:{
    paddingTop:30,
    paddingHorizontal:20,
    height:70,
    flexDirection:'row',
    backgroundColor:'rgb(66, 112, 142 )',
    alignItems:'center',
  },
  titleStyle:{
    flex:1,
    fontWeight:'bold',
    fontSize:20,
    textAlign:'center',
  }
})
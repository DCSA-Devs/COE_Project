import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
export default function HomeScreenGenerator({navigationProp,screenItems}){
  return(
    <TouchableOpacity style={styles.touchableOpacityStyle} onPress={()=>navigationProp.push(screenItems.component)}>
        <Image source={screenItems.imgSrc} 
           style={{ width:110, height: 110 }}
        />
        <Text style={styles.componentTextStyle}>
        {screenItems.name}
        </Text>
    </TouchableOpacity>
  );
}

const styles=StyleSheet.create({
    touchableOpacityStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:10,
        paddingHorizontal:10,
        margin:15,
        backgroundColor:'rgb(220, 255, 246)',
        borderColor:"rgb(17, 216, 183 )",
        borderWidth:1,
        borderRadius:10,
    },
    componentTextStyle:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,

    }
});
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {View,Text,StatusBar, Button, StyleSheet } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const lectureData=[
  {title:'Introduction to Subject', link:'https://udemy.pundeermaza.xyz/?/Udemy%20-%20Flutter%20%26%20Dart%20-%20The%20Complete%20Guide%20%5B2020%20Edition%5D/12.%20Adding%20Animations%20%5BSHOP%20APP%5D/1.%20Module%20Introduction.mp4',key:'1'},
  {title:'First Chapter', link:'',key:'2'},
  {title:'Second Chapter', link:'',key:'3'},
  {title:'Third Chapter', link:'',key:'4'},
  {title:'Fourth Chapter', link:'',key:'5'},
  {title:'Fifth Chapter', link:'',key:'6'},
  {title:'Sixth Chapter', link:'',key:'7'},
  ]
export default function LectureVideo({navigation}){
  return(
    <View>
      <FlatList 
        style={styles.flatlistStyle}
        data={lectureData}
        renderItem={({item})=>
        <TouchableOpacity style={styles.touchStyles} onPress={()=>navigation.push('VideoPlayer')}>
          <Text>{item.title}</Text>
        </TouchableOpacity>}
      />
    </View>
  );
}
const styles=StyleSheet.create({
  flatlistStyle:{
    margin:10,
  },
  touchStyles:{
    padding:10,
    margin:5,
    backgroundColor:'rgb(142, 173, 255 )',
    borderRadius:5,
  }
});
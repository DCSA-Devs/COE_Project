import React from 'react';
import {Button,View,Text,StatusBar,StyleSheet,ImageBackground} from 'react-native';
import DrawerHeader from '../../components/drawerScreenComponents/drawerHeader';
export default function DownloadSyllabus({navigation}){
  return(
    <View>
        <DrawerHeader drawerHandler={()=>navigation.toggleDrawer()}/>
    </View>
  );
}
const styles=StyleSheet.create({
  viewStyle:{
    flex:1,
    alignItems:'center',
    padding:30,
  },
  textStyle:{
    fontFamily:"BlackOpsOne-Regular",
    fontSize:20,
  },
  backStyle:{
    flex:1
  }
})
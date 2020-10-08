import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

export default function DepartmentScreenGen({ navigationProp, screenItems }) {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigationProp.push(screenItems.component)}>

      <Image source={screenItems.imgScr} style={styles.imagewrap} />
      <Text style={styles.item}>{screenItems.name}</Text>

    </TouchableOpacity>

  );
}

const styles = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    margin: 5,
    backgroundColor: 'rgb(220, 255, 246)',
    borderColor: 'rgb(17, 216, 183 )',
    borderWidth: 1,
    borderRadius: 10,
  },
  imagewrap: {
    width: Dimensions.get('window').width / 2 - 30,
    height: Dimensions.get('window').height / 3 - 55,
    borderColor: '#fff',
    flex: 1,
    margin: 2,
    padding: 2,
    borderRadius: 100,
  },
  item: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  }

});
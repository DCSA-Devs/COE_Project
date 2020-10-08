import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Card } from 'react-native';

export default function DCSAscreenGen({ navigationProp, screenItems }) {
  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigationProp.push(screenItems.component)}>
      <Text style={styles.item}>{screenItems.title}</Text>
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
    borderRadius: 10,
  },
  item: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  }
});
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {props.children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.6,
    shadowRadius: 4,
    marginHorizontal: 4,
    marginVertical: 6,
    backgroundColor: '#97cfc0',
  },
  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,

  }
});
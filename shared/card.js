import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Card(props) {
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
      borderRadius: 6,
      elevation: 3,
      backgroundColor: '#fff',
      shadowOffset: { width: 5, height: 5},
      shadowColor: '#333',
      shadowOpacity: 0.5,
      shadowRadius: 2,
      marginHorizontal: 10,
      marginVertical: 10
    },
    cardContent: {
        marginHorizontal: 18,
        marginVertical: 10,

    }
})
import React from 'react';
import {  StyleSheet, Text, View, Image } from 'react-native';

export default function Logo() {
    return (
        //title and logo for panjab university 
        <View style={{ alignItems: 'center', flex: 1, flexDirection: 'column' }}>
        
            <View >
                <Text style={styles.maintitle}>PANJAB UNIVERSITY</Text>
                <Text style={styles.maintitle}>CHANDIGARH</Text>
                <View >
                    <Image  style={styles.imageprop} source={require('../assets/images/LOGO.png')} >
                    </Image>
                </View>
            
            </View>
        </View>
    );
}

//styling
const styles = StyleSheet.create({
    imageprop: {
        width: 60,
        height: 60,
        marginTop:5,
        marginLeft:70
    },
    maintitle: {
        color: '#01579b',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }

});
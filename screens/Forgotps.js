import React from 'react';
import {StyleSheet,View,Text,Button, TextInput} from 'react-native'
import Logo from '../components/Logo'

export default function Forgetps({navigation}){
    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.register}>
                <Text >Trouble logging in ?{"\n"}{"\n"}{"\n"}</Text>
                <Text>Enter your mail and we will send</Text>
                <Text>a link to get into your account{"\n"}{"\n"}</Text>
                
                <TextInput
                                style={styles.input}
                                placeholder='Email'
                            
                />
                
                <View style={styles.btn}>
                            <Button color='#2196F3' title="Send Login Link"  />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        paddingTop: 100,
    },
    register:{
        marginTop:100,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        paddingTop:50,
        fontSize:30,
        color:'#2196F3'
    },
    input: {
        borderWidth: 1,
        borderColor: '#2196F3',
        backgroundColor:'#ddd',
        borderRadius: 6,
        color: 'black',
        fontSize: 15,
        paddingTop: 5,
        padding: 5,
        margin: 5,
        height: 50,
        width: 320,
       
    },
    btn: {
        padding: 18,
        color: 'blue',
        width: '60%',
        borderRadius: 10,
        height: '15%',
        margin: 5,
        alignContent: 'center',
        paddingLeft: 80,
        marginLeft:-55,
    }
})

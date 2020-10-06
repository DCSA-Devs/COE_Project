import React from 'react';
import { StyleSheet, View, Text, Button, TextInput ,KeyboardAvoidingView} from 'react-native'
import Logo from '../components/Logo'

export default function Forgetps({ navigation }) {
    return (
        <KeyboardAvoidingView>
        <View style={styles.container}>
            <Logo />
            <View style={styles.headtitle}>
                <Text style={styles.head}>Trouble logging in ?{"\n"}</Text>
                <Text>Enter your email and we will send</Text>
                <Text>a link to get into your account{"\n"}{"\n"}</Text>

                <TextInput
                    style={styles.input}
                    placeholder='Email'

                />

                <View style={styles.btn}>
                    <Button title="Send Login Link" />
                </View>
            </View>
        </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop: 80,
    },
    headtitle: {
        marginTop: 100,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
    head: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 20,
        marginTop: 30
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        paddingTop: 50,
        fontSize: 30,
        color: '#2196F3'
    },
    input: {
        borderWidth: 1,
        borderColor: '#2196F3',
        backgroundColor: '#ddd',
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
        flexDirection: 'column',
        padding: 18,
        color: 'blue',
        width: '60%',
        borderRadius: 10,
        height: '15%',
        margin: 5,
        alignContent: 'center',
        paddingLeft: 80,
        marginLeft: -55
    }
})

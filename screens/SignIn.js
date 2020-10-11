import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import Logo from '../components/Logo';

export default function SignIn({ navigation }) {

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Logo />
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={async (values) => {
                        const req = await fetch('https://coeproject.herokuapp.com/login', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values)
                        })
                        if (req.status != 200) {
                            alert('Login Failed')
                        }
                        else {
                            const user = await req.json()
                            navigation.push('DepartmentScreen', { user })
                        }
                    }}
                >
                    {(props) => (
                        //Sign In form
                        <View>
                            <Text style={styles.title}>Sign In</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='E-mail'
                                onChangeText={props.handleChange('email')}
                                value={props.values.username}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder='Password'
                                onChangeText={props.handleChange('password')}
                            />
                            <Text style={{ paddingLeft: 200, color: '#2196F3' }} onPress={() => navigation.push('Forgotps')}>Forgot password ?</Text>

                            <View style={[{ width: '80%', margin: 10, alignContent: 'center', paddingLeft: 120 }]}>
                                <Button color='#2196F3' title="Log In" onPress={props.handleSubmit} />

                            </View>
                            <Text style={{ alignContent: 'center', paddingLeft: 110, color: '#2196F3' }} onPress={() => navigation.push('SignUp')}>Create Account</Text>
                        </View>
                    )}
                </Formik>
            </View>

        </KeyboardAvoidingView>
    );
}

//styling
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        paddingTop: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        paddingTop: 50,
        fontSize: 25,
        color: '#2196F3',
        marginTop: 75
    },
    input: {
        backgroundColor: '#ddd',
        borderRadius: 6,
        color: 'black',
        fontSize: 15,
        paddingTop: 5,
        padding: 5,
        margin: 5,
        height: 50,
        width: 320
    },
})
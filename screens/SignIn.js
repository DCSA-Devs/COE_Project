import React from 'react';
import { Alert, StyleSheet, ActivityIndicator, TouchableOpacity, ToastAndroid, TextInput, View, Text, KeyboardAvoidingView } from 'react-native';
import { Formik } from 'formik';
import Logo from '../components/Logo';

export default function SignIn({ navigation }) {
    const [isDisabled, setDisabled] = React.useState(false)
    const Toast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }
    const failAlert = () => {
        Alert.alert('Login Failed', 'Make sure credentials are correct', [
            {
                text: 'OK'
            }

        ], { cancelable: true })
    }
    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <Logo />
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={async (values) => {
                        setDisabled(true)
                        const req = await fetch('https://coeproject.herokuapp.com/login', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values)
                        })
                        if (req.status != 200) {
                            failAlert()
                        }
                        else {
                            const user = await req.json()
                            Toast('Login Successfull')
                            navigation.push('DepartmentScreen', { user })

                        }
                        setDisabled(false)
                    }}
                >
                    {(props) => (
                        //Sign In form
                        <View>

                            <Text style={styles.title}>Sign In</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='E-mail'
                                editable={!isDisabled}
                                onChangeText={props.handleChange('email')}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder='Password'
                                editable={!isDisabled}
                                onChangeText={props.handleChange('password')}
                            />
                            <Text style={{ color: '#2196F3', alignSelf: 'flex-end', marginRight: 10 }} onPress={() => navigation.push('Forgotps')}>Forgot password ?</Text>
                            <TouchableOpacity onPress={props.handleSubmit} disabled={isDisabled}>
                                <View style={[{ width: '50%', alignSelf: 'center', padding: 5, backgroundColor: isDisabled ? '#E2E2E2' : '#2196F3', flexDirection: 'row', justifyContent: 'center', margin: 10 }]}>
                                    {isDisabled ? <ActivityIndicator size="small" color="#2196F3" /> : false}
                                    <Text style={{ color: isDisabled ? 'grey' : 'white' }}>{isDisabled ? " LOGGING YOU IN" : "LOGIN"}</Text>
                                </View>
                            </TouchableOpacity>
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
        alignItems: 'center',
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
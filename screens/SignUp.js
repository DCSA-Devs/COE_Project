
import React, { useState } from 'react';
import { Alert, TouchableOpacity, ToastAndroid, StyleSheet, ActivityIndicator, TextInput, View, Text, ScrollView } from 'react-native';
import { ErrorMessage, Formik } from 'formik';
import Logo from '../components/Logo';
import { RadioButton } from 'react-native-paper';
import * as yup from 'yup';


export default function SignUp({ navigation }) {
    const [isDisabled, setDisabled] = React.useState(false)
    const [value, setValue] = React.useState('Student');
    const Toast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT)
    }
    const failAlert = (errorMessage) => {
        Alert.alert('Error!', errorMessage, [
            {
                text: 'OK'
            }

        ], { cancelable: true })
    }
    //validations
    const reviewformschema = yup.object({
        firstName: yup.string()
            .required()
            .min(4),
        lastName: yup.string()
            .required()
            .min(4),
        email: yup.string()
            .required()
            .email(),
        mobile: yup.string()
            .required()
            .min(10)
            .max(10),
        password: yup.string()
            .required()
            .min(8),
        confirm_password: yup.string()
            .required()
            .min(8)
            .test('passwords-match', 'Passwords must match ', function (value) {
                return this.parent.password === value;
            })
    });

    return (
        //Sign Up form
        <ScrollView >
            <View style={styles.container}>
                <Logo />

                <View style={{ marginTop: 1 }}>
                    <Text style={styles.title}>Sign Up </Text>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', email: '', mobile: '', password: '', confirm_password: '' }}
                        validationSchema={reviewformschema}
                        onSubmit={async (values) => {
                            setDisabled(true)
                            values.profession = value

                            const req = await fetch('https://coeproject.herokuapp.com/register', {
                                method: 'POST',
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(values)
                            })
                            if (req.status != 200) {
                                const error = await req.json()
                                failAlert(JSON.stringify(error.message))
                            }
                            else {
                                Toast('Account created')
                                navigation.push('SignIn')
                            }
                            setDisabled(false)
                        }}
                    >
                        {(props) => (

                            <View>
                                <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                                    <View style={{ flexDirection: 'row', paddingLeft: 180 }}>
                                        <RadioButton value='Student' onPress={(value) => setValue(value)} /><Text style={{ marginTop: 6 }}>I am student</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', paddingLeft: 180 }}>
                                        <RadioButton value='Teacher' onPress={(value) => setValue(value)} /><Text style={{ marginTop: 6 }}>I am Teacher</Text>
                                    </View>
                                </RadioButton.Group>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter First name'
                                    onChangeText={props.handleChange('firstName')}
                                    value={props.values.firstName}
                                    onBlur={props.handleBlur('firstName')}
                                    editable={!isDisabled}
                                />
                                <Text style={styles.errorText}>{props.touched.firstName && props.errors.firstName}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter Last name'
                                    onChangeText={props.handleChange('lastName')}
                                    value={props.values.lastName}
                                    onBlur={props.handleBlur('lastName')}
                                    editable={!isDisabled}
                                />
                                <Text style={styles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter e-mail id'
                                    onChangeText={props.handleChange('email')}
                                    value={props.values.email}
                                    onBlur={props.handleBlur('email')}
                                    editable={!isDisabled}
                                />
                                <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter mobile no.'
                                    onChangeText={props.handleChange('mobile')}
                                    value={props.values.mobile}
                                    keyboardType='numeric'
                                    onBlur={props.handleBlur('mobile')}
                                    editable={!isDisabled}
                                />
                                <Text style={styles.errorText}>{props.touched.mobile && props.errors.mobile}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Enter password'
                                    onChangeText={props.handleChange('password')}
                                    value={props.values.password}
                                    onBlur={props.handleBlur('password')}
                                    editable={!isDisabled}
                                />
                                <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Confirm Password'
                                    onChangeText={props.handleChange('confirm_password')}
                                    value={props.values.confirm_password}
                                    onBlur={props.handleBlur('confirm_password')}
                                    editable={!isDisabled}
                                />
                                <Text style={styles.errorText}>{props.touched.confirm_password && props.errors.confirm_password}</Text>
                                <TouchableOpacity onPress={props.handleSubmit} disabled={isDisabled}>
                                    <View style={{
                                        width: '50%', alignSelf: 'center', borderRadius: 10, padding: 5, backgroundColor: isDisabled ? '#E2E2E2' : '#2196F3', flexDirection: 'row', justifyContent: 'center', margin: 10
                                    }}>
                                        {isDisabled ? <ActivityIndicator size="small" color="#2196F3" /> : false}
                                        <Text style={{ color: isDisabled ? 'grey' : 'white' }}>{isDisabled ? " Creating Account" : "Create Account"}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </View>
            </View >
        </ScrollView>

    );
}

//styling
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',

    },
    input: {
        backgroundColor: '#ddd',
        borderRadius: 10,
        color: 'black',
        fontSize: 15,
        paddingTop: 5,
        padding: 5,
        margin: 5,
        height: 50,
        width: 300,
    },
    title: {
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 25,
        color: '#2196F3',
        marginTop: 10

    },
    btn: {
        padding: 18,
        color: 'blue',
        width: '80%',
        borderRadius: 10,
        height: '15%',
        margin: 5,
        alignContent: 'center',
        paddingLeft: 80
    },
    errorText: {
        color: 'crimson',
        fontWeight: "bold",
        marginBottom: 3,
        marginTop: 3,
        textAlign: "center"
    }

})


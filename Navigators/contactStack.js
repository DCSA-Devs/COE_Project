import { createStackNavigator } from "@react-navigation/stack";
import Header from '../shared/header';
import Contact from '../screens/contact';
import ContactDetails from '../screens/contactDetails';
import React from 'react';


const Stack = createStackNavigator();
function ContactStack({navigation}) {
    return (
      <Stack.Navigator
        initialRouteName="Contact"
        screenOptions={{ gestureEnabled: false }}
      >
        <Stack.Screen
          name="Contact"
          component={Contact}
          options= {({ navigation }) => ({     // navigation is object and navigationOptions is a function that returns an object
            
            headerTitle:() => <Header navigation={navigation} title='Contact PU' />,   // title: () => <Header />       title expects a string not a function
            } )
        }
        />


        <Stack.Screen
          name="ContactDetails"
          component={ContactDetails}
          options={{ title: 'Contact Details' }}
        //  initialParams={{ user: 'me' }}
        />

      </Stack.Navigator>
    );
  }


export default ContactStack;







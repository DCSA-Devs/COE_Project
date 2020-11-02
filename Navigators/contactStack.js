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
          options= {({ navigation }) => ({     
            
            headerTitle:() => <Header navigation={navigation} title='Contact PU' />,   
            } )
        }
        />


        <Stack.Screen
          name="ContactDetails"
          component={ContactDetails}
          options={{ title: 'Contact Details' } }
        />

      </Stack.Navigator>
    );
  }


export default ContactStack;







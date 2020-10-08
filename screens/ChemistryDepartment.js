import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles';
import Card from '../components/card';


export default function ChemistryDepartment({ navigation }) {
  const [classname, setClass] = useState([
    { title: 'Chemistry - 1st year', key: '1' },
    { title: 'Chemistry - 2nd year', key: '2' },
    { title: 'Chemistry - 3rd year', key: '3' },
    { title: 'Chemistry - 4th year', key: '4' },
    { title: 'Chemistry - 5th year', key: '5' },
    { title: 'Chemistry - 6th year', key: '6' },

  ]);


  return (
    <View style={globalStyles.container1}>
      <FlatList
        keyExtractor={(item) => item.key}
        data={classname}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.push('semesterScreen')}>
            <Card>
              <Text style={globalStyles.titleText}>{item.title}</Text>
            </Card>

          </TouchableOpacity>
        )}
      />
    </View>
  )
}
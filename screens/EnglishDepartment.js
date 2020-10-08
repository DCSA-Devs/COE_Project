import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles';
import Card from '../components/card';

export default function EnglishDepartment({ navigation }) {
  const [classname, setClass] = useState([
    { title: 'English - 1st year ', key: '1' },
    { title: 'English - 2nd year ', key: '2' },
    { title: 'English - 3rd year ', key: '3' },
    { title: 'English - 4th year ', key: '4' },
    { title: 'English - 5th year ', key: '5' },
    { title: 'English - 6th year ', key: '6' },

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
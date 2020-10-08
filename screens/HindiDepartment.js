import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles';
import Card from '../components/card';

export default function HindiDepartment({ navigation }) {
  const [classname, setClass] = useState([
    { title: 'Hindi - 1st year ', key: '1' },
    { title: 'Hindi - 2nd year ', key: '2' },
    { title: 'Hindi - 3rd year ', key: '3' },
    { title: 'Hindi - 4th year ', key: '4' },
    { title: 'Hindi - 5th year ', key: '5' },
    { title: 'Hindi - 6th year ', key: '6' },

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
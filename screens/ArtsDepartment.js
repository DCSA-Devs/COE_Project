import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles';
import Card from '../components/card';


export default function ArtsDepartment({ navigation }) {
  const [classname, setClass] = useState([
    { title: 'Arts - 1st year', key: '1' },
    { title: 'Arts - 2nd year', key: '2' },
    { title: 'Arts - 3rd year', key: '3' },
    { title: 'Arts - 4th year', key: '4' },
    { title: 'Arts - 5th year', key: '5' },

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
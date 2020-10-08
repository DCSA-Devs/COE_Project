import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function semesterScreen({ navigation }) {
  const [sem, semester] = useState([
    { name: 'MCA Semester-1', key: '1' },
    { name: 'MCA Semester-2', key: '2' },
    { name: 'MCA Semester-3', key: '3' },
    { name: 'MCA Semester-4', key: '4' },
    { name: 'MCA Semester-5', key: '5' },
    { name: 'MCA Semester-6', key: '6' },
    { name: 'Msc Semester-1', key: '7' },
    { name: 'Msc Semester-2', key: '8' },
    { name: 'Msc Semester-3', key: '9' },
    { name: 'Msc Semester-4', key: '10' },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.key}
        data={sem}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.push('DepartmentScreen')}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}

      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingLeft: 1,
    paddingRight: 1,

  },
  item: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#97cfc0',
    fontSize: 18,
    marginHorizontal: 10,
    borderRadius: 10,
    fontWeight: 'bold',
  }
});
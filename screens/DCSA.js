import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { globalStyles } from '../globalStyles';
import Card from '../components/card';
import DCSAscreenGen from '../components/DCSAscreenGen';

export default function DCSA({ navigation }) {
  const [classname, setClass] = useState([
    { component: 'McaHand', title: 'MCA', key: '1' },
    { component: 'MscHand', title: 'Msc', key: '2' },

  ]);


  return (
    <View style={globalStyles.container1}>
      <FlatList
        keyExtractor={(item) => item.key}
        data={classname}
        renderItem={({ item }) => (
          <Card>
            <DCSAscreenGen
              navigationProp={navigation}
              screenItems={item}
            />
          </Card>

        )}
      />
    </View>
  )
}
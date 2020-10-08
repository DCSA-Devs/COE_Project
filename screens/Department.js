import React, { useState } from 'react';
import { StyleSheet, View, FlatList, } from 'react-native';
import DepartmentScreenGen from '../components/DepartmentScreenGen';

export default function Home({ navigation }) {
  const [doc, setdoc] = useState([
    { component: 'ArtsDepartment', name: 'Arts', imgScr: require('../assets/images/arts.jpg'), key: '1' },
    { component: 'ChemistryDepartment', name: 'Chemistry', imgScr: require('../assets/images/chemistry.jpg'), key: '2' },
    { component: 'DCSA', name: 'Computer Science', imgScr: require('../assets/images/computer.jpg'), key: '3' },
    { component: 'EngineeringDepartment', name: 'Engineering and Technology', imgScr: require('../assets/images/engineering.jpg'), key: '4' },
    { component: 'EnglishDepartment', name: 'English', imgScr: require('../assets/images/english.jpg'), key: '5' },
    { component: 'HindiDepartment', name: 'Hindi', imgScr: require('../assets/images/Hindi.jpg'), key: '6' },
    { component: 'HotelDepartment', name: 'Hotel Management', imgScr: require('../assets/images/Hotel.jpg'), key: '7' },
    { component: 'LawDepartment', name: 'Law', imgScr: require('../assets/images/law.jpg'), key: '8' },
    { component: 'Mathematics Department', name: 'Mathematics', imgScr: require('../assets/images/maths.jpg'), key: '9' },
    { component: 'Pharmaceutical Sciences Department', name: 'Pharmaceutical Sciences', imgScr: require('../assets/images/Pharmaceutical.jpg'), key: '10' },
    { component: 'Science Department', name: 'Science', imgScr: require('../assets/images/science.jpg'), key: '11' },
    { component: 'Panjabi Department', name: 'Panjabi', imgScr: require('../assets/images/panjabi.jpg'), key: '12' },
    { component: 'Psychology Department', name: 'Psychology', imgScr: require('../assets/images/psychology.jpg'), key: '13' },
    // { component: 'Psychology Department', name: 'Psychology', imgScr: require('../assets/images/psychology.jpg'), key: '14' },
  ]);


  return (
    <View style={styles.menuContainer}>
      <FlatList
        numColumns={2}
        keyExtractor={(item) => item.key}
        data={doc}
        renderItem={({ item }) =>
          <DepartmentScreenGen
            navigationProp={navigation}
            screenItems={item}
          />
        }
      />

    </View>
  );

}
const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    // height: 30,
    // flexDirection: 'row',
    // marginTop: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(241, 255, 255)',

  },

});
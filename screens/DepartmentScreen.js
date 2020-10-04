import React, { useState } from 'react';
import { View, Text, StatusBar, Button, StyleSheet, FlatList } from 'react-native';
import HomeScreenGenerator from '../components/homeScreenGenerator';
export default function Home({ navigation }) {
    const [screens, setScreens] = useState([
        { component: 'LectureVideo',name:'Lecture Video',imgSrc:require('../assets/images/play.jpg'),key: '1' },
        { component: 'Notes',name:'Subject Notes',imgSrc:require('../assets/images/books.png'),key: '2' },
        { component: 'Notes',name:'E-Books',imgSrc:require('../assets/images/books2.png'),key: '3' },
        { component: 'Notes',name:'Forum',imgSrc:require('../assets/images/forum.png'),key: '4' },
        { component: 'Notes',name:'Sample Question Paper',imgSrc:require('../assets/images/qp.png'),key: '5' },
        { component: 'Notes',name:'Download Syllabus',imgSrc:require('../assets/images/syllabus.png'),key: '6' },
        { component: 'Notes',name:'Upload Resource',imgSrc:require('../assets/images/upload.png'),key: '7' },

    ]);
    return (
        <View style={styles.homeContainer}>
            <FlatList
                style={styles.flatListStyle}
                numColumns={2}
                keyExtractor={(item)=>item.key}
                data={screens}
                renderItem={({ item }) =>
                    <HomeScreenGenerator
                        navigationProp={navigation}
                        screenItems={item}        
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        justifyContent:'center',
        backgroundColor: 'rgb(241, 255, 255)',
    },
    flatListStyle:{
        flex:1,
    }
});
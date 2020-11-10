import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import DepartmentScreenGenerator from "../../components/drawerScreenComponents/departmentScreenGenerator";

const screens = [
  //It has to be here as stack navigator contains login and other screen or we have to filter
  {
    component: "LectureVideo",
    name: "Lecture Video",
    imgSrc: require("../../assets/images/VideoLecture.png"),
    key: "1",
  },
  {
    component: "Document",
    name: "Assignments",
    imgSrc: require("../../assets/images/Book1.png"),
    key: "2",
    uri: "https://coeproject.herokuapp.com/getAssignments",
  },
  {
    component: "Document",
    name: "E-Books",
    imgSrc: require("../../assets/images/EBooks.png"),
    key: "3",
    uri: "https://coeproject.herokuapp.com/getEbooks",
  },
  {
    component: "Forum",
    name: "Forum",
    imgSrc: require("../../assets/images/Forum1.png"),
    key: "4",
  },
  {
    component: "Document",
    name: "Sample Papers",
    imgSrc: require("../../assets/images/questionPaper.png"),
    key: "5",
    uri: "https://coeproject.herokuapp.com/getSamplePapers",
  },
  {
    component: "Syllabus",
    name: "Syllabus",
    imgSrc: require("../../assets/images/PDF.png"),
    key: "6",
  },
];

export default function Home({ navigation }) {
  return (
    <View style={styles.homeContainer}>
      <FlatList
        style={styles.flatListStyle}
        numColumns={2}
        keyExtractor={(item) => item.key}
        data={screens}
        renderItem={({ item }) => (
          <DepartmentScreenGenerator
            navigationProp={navigation}
            screenItems={item}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
  },
  flatListStyle: {
    flex: 1,
  },
});

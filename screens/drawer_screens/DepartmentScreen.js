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
    component: "Notes",
    name: "Subject Notes",
    imgSrc: require("../../assets/images/Book1.png"),
    key: "2",
  },
  {
    component: "Notes",
    name: "E-Books",
    imgSrc: require("../../assets/images/EBooks.png"),
    key: "3",
  },
  {
    component: "Forum",
    name: "Forum",
    imgSrc: require("../../assets/images/Forum1.png"),
    key: "4",
  },
  {
    component: "Notes",
    name: "Sample Question Paper",
    imgSrc: require("../../assets/images/questionPaper.png"),
    key: "5",
  },
  {
    component: "Syllabus",
    name: "Download Syllabus",
    imgSrc: require("../../assets/images/PDF.png"),
    key: "6",
  },
  {
    component: "Notes",
    name: "Upload Resource",
    imgSrc: require("../../assets/images/Uploading.png"),
    key: "7",
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

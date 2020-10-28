import React from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
export default function SyllabusRender({ route }) {
  //? Implement Toast for error messages
  //? Find fix for scrollview Hint:flex
  const subject = route.params.data;
  return (
    <ScrollView>
      <View style={styles.card}>
        <Text style={styles.subjectHeading}>{subject.name}</Text>
        <Text style={styles.text}>Time : {subject.time}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.text}>Paper Code : {subject.paper_code}</Text>
          <Text style={styles.text}>Max Marks : {subject.max_marks}</Text>
        </View>
        {subject.units.map((unit, index) => {
          let count = 0;
          let already = 0;
          return Object.keys(unit).map((values, indexx) => (
            <View key={indexx}>
              {already++ === 0 ? (
                <Text style={styles.unit}>{"Unit " + ++index}</Text>
              ) : null}
              <Text style={styles.heading}>{++count + ". " + values}</Text>
              <Text style={styles.text}>{unit[values]}</Text>
            </View>
          ));
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subjectHeading: {
    textAlign: "center",
    fontWeight: "bold",
    padding: 10,
    fontSize: 15,
  },
  text: {
    padding: 5,
    fontSize: 13,
  },
  heading: {
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  unit: {
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 15,
  },
  card: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 20,
    padding: 10,
  },
});

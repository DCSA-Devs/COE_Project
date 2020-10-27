import React from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { ActivityIndicator } from "react-native-paper";
export default function SyllabusRender({ navigation, route }) {
  //? Implement Toast for error messages
  //? Find fix for scrollview Hint:flex
  const [syllabus, setSyllabus] = React.useState(null);
  React.useEffect(() => {
    const url =
      "https://coeproject.herokuapp.com/syllabus?sem=" + route.params.value;
    const fetchSyllabus = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (res.status === 200) {
          setSyllabus(data);
        } else {
          alert("Sylabus not found");
          // ToastAndroid.show(JSON.stringify(data.message),ToastAndroid.SHORT)
          navigation.goBack();
        }
      } catch (err) {
        alert("Error: Check Internet Connection");
        // ToastAndroid.show("Error: Check Internet Connection",ToastAndroid.SHORT)
        navigation.goBack();
      }
    };
    fetchSyllabus();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.ScrollView}>
      <View>
        {syllabus ? (
          syllabus.syllabus.map((subject) => (
            <>
              <View style={styles.card}>
                <Text style={styles.subjectHeading}>{subject.name}</Text>
                <Text style={styles.text}>Time : {subject.time}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.text}>
                    Paper Code : {subject.paper_code}
                  </Text>
                  <Text style={styles.text}>
                    Max Marks : {subject.max_marks}
                  </Text>
                </View>
                {subject.units.map((unit, index) => {
                  let count = 0;
                  let already = 0;
                  return Object.keys(unit).map((values) => (
                    <>
                      {already++ === 0 ? (
                        <Text style={styles.unit}>{"Unit " + ++index}</Text>
                      ) : null}
                      <Text style={styles.heading}>
                        {++count + ". " + values}
                      </Text>
                      <Text style={styles.text}>{unit[values]}</Text>
                    </>
                  ));
                })}
              </View>
            </>
          ))
        ) : (
          <>
            <Text style={styles.subjectHeading}>Fetching Syllabus</Text>
            <ActivityIndicator size="large" />
          </>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  ScrollView: {
    justifyContent: "center",
    alignItems: "center",
  },
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

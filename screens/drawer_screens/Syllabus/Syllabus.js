import React from "react";
import { View, Text, ScrollView } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
export default function Syllabus({ navigation }) {
  //? Implement Toast for error messages
  //? Find fix for scrollview Hint:flex
  const [syllabus, setSyllabus] = React.useState(null);

  React.useEffect(() => {
    const url = "https://coeproject.herokuapp.com/syllabus";

    // function to fetch syllabus from database
    const fetchSyllabus = async () => {
      try {
        const res = await fetch(url);
        const syllabusFetched = await res.json();
        if (res.status === 200) {
          //persist syllabus
          await AsyncStorage.setItem(
            "syllabus",
            JSON.stringify(syllabusFetched)
          );
          setSyllabus(syllabusFetched);
        } else {
          alert("Sylabus not found");
          // ToastAndroid.show(JSON.stringify(data.message),ToastAndroid.SHORT)
        }
      } catch (err) {
        alert("Error: Check Internet Connection");
        // ToastAndroid.show("Error: Check Internet Connection",ToastAndroid.SHORT)
      }
    };

    // Function to fetch syllabus saved offline
    const fetchSyllabusOffline = async () => {
      const data = await AsyncStorage.getItem("syllabus");
      const syllabusOffline = JSON.parse(data);
      if (syllabusOffline) {
        setSyllabus(syllabusOffline);
        // if syllabus not available offline fetch from database
      } else {
        fetchSyllabus();
      }
    };
    fetchSyllabusOffline();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={
        syllabus
          ? false
          : {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      <View>
        <List.Section style={{ marginLeft: 10 }}>
          {syllabus ? (
            syllabus.map((semester, index) => (
              <List.Accordion
                key={index}
                title={"Semester " + semester.semester}
              >
                {semester.syllabus.length === 0 ? (
                  <List.Item title="No data found" />
                ) : null}
                {semester.syllabus.map((subject, indexx) => (
                  <List.Item
                    key={indexx}
                    title={subject.name}
                    onPress={() =>
                      navigation.navigate("SyllabusRender", {
                        data: subject,
                      })
                    }
                  />
                ))}
              </List.Accordion>
            ))
          ) : (
            <>
              <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
                Fetching Syllabus
              </Text>
              <ActivityIndicator size="large" />
            </>
          )}
        </List.Section>
      </View>
    </ScrollView>
  );
}

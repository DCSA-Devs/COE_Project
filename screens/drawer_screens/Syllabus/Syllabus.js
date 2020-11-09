import React from "react";
import { View, Text, ScrollView } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
export default function Syllabus({ navigation }) {
  //? Implement Toast for error messages
  //? Find fix for scrollview Hint:flex
  const [syllabus, setSyllabus] = React.useState(null);
  React.useEffect(() => {
    const url = "http://localhost:3000/syllabus";
    const url2 = "https://coeproject.herokuapp.com/syllabus";

    const fetchSyllabus = async () => {
      try {
        const res = await fetch(url2);
        const data = await res.json();
        if (res.status === 200) {
          console.log(data);
          await AsyncStorage.setItem("syllabus", JSON.stringify(data));
          setSyllabus(data);
        } else {
          alert("Sylabus not found");
          // ToastAndroid.show(JSON.stringify(data.message),ToastAndroid.SHORT)
        }
      } catch (err) {
        alert("Error: Check Internet Connection");
        // ToastAndroid.show("Error: Check Internet Connection",ToastAndroid.SHORT)
      }
    };
    const fetchSyllabusOffline = async () => {
      let syllabus = await AsyncStorage.getItem("syllabus");
      console.log("syllabus", syllabus);
      if (syllabus) {
        syllabus = JSON.parse(syllabus);
        setSyllabus(syllabus);
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

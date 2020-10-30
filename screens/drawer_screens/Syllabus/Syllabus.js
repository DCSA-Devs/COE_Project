import React from "react";
import { View, Text, ScrollView } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";

const semesters = [1, 2, 3, 4, 5, 6];
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

    fetchSyllabus();
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

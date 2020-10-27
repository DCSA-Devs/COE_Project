import React from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";

const semesters = [1, 2, 3, 4, 5, 6];
export default function Syllabus({ navigation }) {
  return (
    <View>
      <List.Section style={{ marginLeft: 10 }}>
        {semesters.map((semester) => (
          <List.Item
            title={"Semester " + semester}
            key={semester}
            onPress={() =>
              navigation.navigate("SyllabusRender", {
                value: semester,
              })
            }
          />
        ))}
      </List.Section>
    </View>
  );
}

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
const mon = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
export default function Question(props) {
  const question = props.question;
  const date = new Date(question.dateAsked);
  let formatedDate = date.getDate().toString();
  formatedDate += " " + mon[date.getMonth().toString()];
  formatedDate += " " + date.getFullYear().toString().slice(2, 4);
  // Gray (#606060FF) and Lime Punch (#D6ED17FF)
  // Forest Green (#2C5F2D) and Moss Green (#97BC62FF)
  // Electric Blue Lemonade (#0063B2FF) and Aquamarine (#9CC3D5FF)
  // Black (#101820FF) and Blazing Yellow (#FEE715FF)
  // (#D198C5FF) and Cream Gold (#E0C568FF)
  // Sky Blue (#89ABE3FF) and White (#FCF6F5FF
  const fullname = (
    question.askedBy.firstName +
    " " +
    question.askedBy.lastName
  ).toLowerCase();
  const initials = question.askedBy.firstName[0] + question.askedBy.lastName[0];
  return (
    <View style={styles.question}>
      {!question.askedBy.profilePic ? (
        <Avatar.Text
          label={initials}
          color="#606060FF"
          style={{ backgroundColor: "#D6ED17FF" }}
        />
      ) : (
        <Avatar.Image source={{ uri: question.askedBy.profilePic }} />
      )}
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          flexShrink: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {props.question.title}
        </Text>
        <Text style={{ color: "grey", textTransform: "capitalize" }}>
          {fullname}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "bold" }}>14 replies</Text>
          <Text>{formatedDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    margin: 5,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
});

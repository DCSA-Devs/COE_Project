import React from "react";
import { View, Text, StyleSheet } from "react-native";
import relativeDate from "relative-date";

import {
  Avatar,
  TextInput,
  Button,
  Divider,
  IconButton,
} from "react-native-paper";
import { userContext } from "../../userContext";
export default function Question({ navigation, route }) {
  const { state } = React.useContext(userContext);
  const question = route.params.question;
  //? Add a flair for teacher
  //? Add edit comments
  //? Add delete comments
  const fullname = (
    question.askedBy.firstName +
    " " +
    question.askedBy.lastName
  ).toLowerCase();
  const [replies, setReplies] = React.useState(null);
  const [reply, setReply] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const fetchReplies = async () => {
      const url = "http://localhost:3000/getReplies/" + question._id;
      const url2 =
        "https://coeproject.herokuapp.com/getReplies/" + question._id;
      // console.log("url : ", url2);
      const res = await fetch(url2);
      const replies = await res.json();
      console.log("Replies :", replies);
      if (res.status == 200) setReplies(replies);
    };
    fetchReplies();
  }, []);
  const postReply = async () => {
    const url = "http://localhost:3000/postReply";
    const url2 = "https://coeproject.herokuapp.com/postReply";
    const res = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postID: question._id,
        userID: state.user._id,
        reply,
      }),
    });
    if (res.status == 200) setVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.questionView}>
        <Text style={styles.title}>{question.title}</Text>
        <View style={{ flexDirection: "row", marginVertical: 5 }}>
          <Text style={styles.username}>{fullname}</Text>
          <Text>{relativeDate(new Date(question.dateAsked))}</Text>
        </View>
        <Text style={styles.content}>{question.body}</Text>
      </View>
      <Divider />
      {!visible ? (
        <Button mode="contained" onPress={() => setVisible(true)}>
          Reply
        </Button>
      ) : (
        <View style={{ padding: 10, backgroundColor: "white" }}>
          <TextInput
            multiline={true}
            value={reply}
            onChangeText={setReply}
            placeholder="Type your comment"
            numberOfLines={2}
          />
          <View style={{ flexDirection: "row-reverse" }}>
            <IconButton
              icon="send"
              color="#6200EE"
              onPress={() => postReply()}
            />
            <IconButton
              icon="cancel"
              color="#6200EE"
              onPress={() => setVisible(false)}
            />
          </View>
        </View>
      )}
      {replies
        ? replies.map((reply, index) => (
            <View key={index} style={styles.commentView}>
              <View style={styles.commentUserTimeVIew}>
                <Text style={styles.username}>
                  {(reply.by.firstName + " " + reply.by.lastName).toLowerCase()}
                </Text>
                <Text>{relativeDate(new Date(reply.date))}</Text>
              </View>
              <Text>{reply.content}</Text>
              <Divider />
            </View>
          ))
        : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionView: {
    padding: 10,
    backgroundColor: "#FFFFF0",
  },
  username: {
    textTransform: "capitalize",
    marginRight: 10,
    color: "red",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    fontSize: 16,
  },
  commentView: {
    padding: 10,
    backgroundColor: "white",
  },
  commentUserTimeVIew: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});

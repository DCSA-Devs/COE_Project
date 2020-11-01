import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  TextInput,
  Appbar,
  Button,
  Modal,
  ActivityIndicator,
} from "react-native-paper";
import Question from "./QuestionCard";
import { userContext } from "../../userContext";
import AsyncStorage from "@react-native-community/async-storage";
//? Toast when post fails or succeed
let array = [];
export default function Forum({ navigation }) {
  const { state } = React.useContext(userContext);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [questionsList, setQuestionList] = React.useState(null);
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [isButtonLoading, setButtonLoading] = React.useState(false);

  const fetchNewQuestions = async () => {
    const lastDate = array[0].dateAsked;
    console.log("Last Date", lastDate);
    const url = "http://localhost:3000/test/getQuestions/" + lastDate;
    const url2 =
      "https://coeproject.herokuapp.com/test/getQuestions/" + lastDate;
    const res = await fetch(url2);
    const data = await res.json();
    console.log(data);
    if (data.length !== 0) {
      console.log("ye chala?");
      array = data.concat(array);
      setQuestionList(array);
    }
  };
  const postQuestion = async (title, body, id) => {
    setButtonLoading(true);
    const url = "http://localhost:3000/question-submit";
    const url2 = "https://coeproject.herokuapp.com/question-submit";
    const res = await fetch(url2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        id,
        body,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      setTitle("");
      setBody("");
      console.log("Data", data);
      console.log("array", array);
      array.unshift(data);
      await AsyncStorage.setItem("questions", JSON.stringify(array));
      setQuestionList(array);
      setModalVisibility(false);
      //TOAST
    }
    setButtonLoading(false);
  };

  const fetchQuestionsOffline = async () => {
    const questionsString = await AsyncStorage.getItem("questions");
    console.log("QuestionString : ", questionsString);
    if (questionsString === null) {
      return false;
    }
    const fetchedQuestions = JSON.parse(questionsString);
    array = fetchedQuestions;
    setQuestionList(fetchedQuestions);
    return true;
  };
  React.useEffect(() => {
    const askQuestion = async (title, id) => {
      const url = "http://localhost:3000/getQuestions";
      const url2 = "https://coeproject.herokuapp.com/getQuestions";
      const res = await fetch(url2);
      const data = await res.json();
      console.log(data);
      array = data;
      const questionSaved = await AsyncStorage.setItem(
        "questions",
        JSON.stringify(array)
      );
      setQuestionList(data);
    };
    fetchQuestionsOffline().then((status) => {
      if (status === false) {
        askQuestion();
      } else {
        fetchNewQuestions();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {questionsList ? (
        questionsList.map((question, index) => (
          <Question key={index} question={question} navigation={navigation} />
        ))
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
            Fetching Questions
          </Text>
          <ActivityIndicator size="large" />
        </View>
      )}
      <Modal dismissable={false} visible={modalVisibility}>
        <View style={styles.modalContainer}>
          <TextInput
            mode="outlined"
            placeholder="Title for your question"
            value={title}
            onChangeText={(value) => setTitle(value)}
          />
          <TextInput
            mode="outlined"
            multiline={true}
            numberOfLines={4}
            placeholder="Type your question"
            value={body}
            onChangeText={(value) => setBody(value)}
          />
          <View style={styles.modelButtonView}>
            <Button icon="close" onPress={() => setModalVisibility(false)}>
              Close
            </Button>
            <Button
              loading={isButtonLoading}
              icon="send"
              onPress={() => postQuestion(title, body, state.user._id)}
            >
              Post
            </Button>
          </View>
        </View>
      </Modal>

      {questionsList ? (
        <Appbar style={styles.bottom}>
          <Appbar.Action icon="plus" onPress={() => setModalVisibility(true)} />
          <Appbar.Action
            icon="filter"
            onPress={() => console.log("Pressed filter")}
          />
        </Appbar>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    padding: 20,
    paddingBottom: 10,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },
  modelButtonView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },

  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

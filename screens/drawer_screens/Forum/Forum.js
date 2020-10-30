import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Appbar, Button, Modal, Provider } from "react-native-paper";
import Question from "./QuestionCard";
import { userContext } from "../../userContext";
export default function Forum() {
  const { state } = React.useContext(userContext);

  const [question, setQuestion] = React.useState("");
  const [questionsList, setQuestionList] = React.useState(null);
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const askQuestion = async (title, id) => {
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
      }),
    });
    if (res.status == 200) {
      setModalVisibility(false);
      //TOAST
    }
  };

  React.useEffect(() => {
    const askQuestion = async (title, id) => {
      const url = "http://localhost:3000/getQuestions";
      const url2 = "https://coeproject.herokuapp.com/getQuestions";
      const res = await fetch(url2);
      const data = await res.json();
      console.log(data);
      setQuestionList(data);
    };
    askQuestion();
  }, []);
  return (
    <View style={styles.container}>
      {questionsList
        ? questionsList.map((question, index) => (
            <Question key={index} question={question} />
          ))
        : null}
      <Modal dismissable={false} visible={modalVisibility}>
        <View style={styles.modalContainer}>
          <TextInput
            mode="outlined"
            title="Question?"
            placeholder="Title for your question"
            value={question}
            onChangeText={(value) => setQuestion(value)}
          />
          <View style={styles.modelButtonView}>
            <Button onPress={() => setModalVisibility(false)}>Close</Button>
            <Button onPress={() => askQuestion(question, state.user._id)}>
              Post
            </Button>
          </View>
        </View>
      </Modal>

      <Appbar style={styles.bottom}>
        <Appbar.Action icon="plus" onPress={() => setModalVisibility(true)} />
        <Appbar.Action
          icon="filter"
          onPress={() => console.log("Pressed filter")}
        />
      </Appbar>
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

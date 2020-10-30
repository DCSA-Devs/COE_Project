import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Appbar, Button, Modal, Provider } from "react-native-paper";
import Question from "./QuestionCard";
import { userContext } from "../../userContext";
//? Toast when post fails or succeed
export default function Forum({ navigation }) {
  const { state } = React.useContext(userContext);

  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [questionsList, setQuestionList] = React.useState(null);
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [isButtonLoading, setButtonLoading] = React.useState(false);
  const postQuestion = async (title, body, id) => {
    setButtonLoading(true);
    const url = "http://localhost:3000/question-submit";
    const url2 = "https://coeproject.herokuapp.com/question-submit";
    const res = await fetch(url, {
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
    if (res.status == 200) {
      setModalVisibility(false);
      //TOAST
    }
    setButtonLoading(false);
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
            <Question key={index} question={question} navigation={navigation} />
          ))
        : null}
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

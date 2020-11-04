import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  TextInput,
  Appbar,
  Button,
  Modal,
  Chip,
  ActivityIndicator,
} from "react-native-paper";
import Question from "./QuestionCard";
import { userContext } from "../../userContext";
import AsyncStorage from "@react-native-community/async-storage";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
//? Toast when post fails or succeed
let array = [];
export default function Forum({ navigation }) {
  const { state } = React.useContext(userContext);
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [questionsList, setQuestionList] = React.useState(null);
  const [modalVisibility, setModalVisibility] = React.useState(false);
  const [orderFilter, setOrderFilter] = React.useState("ASC");
  const [filter, setFilter] = React.useState("DateUploaded");
  const [filterModalVisibility, setFilterModalVisibility] = React.useState(
    false
  );
  const [isButtonLoading, setButtonLoading] = React.useState(false);
  React.useEffect(() => {
    if (questionsList != null) {
      AsyncStorage.setItem("questions", JSON.stringify(questionsList))
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log("AsyncStorage Error"));
    }
  }, [questionsList]);
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
      array = data.concat(array);
      setQuestionList(array);
    } else {
      const url = "http://localhost:3000/countQuestions/" + array.length;
      const url2 =
        "https://coeproject.herokuapp.com/countQuestions/" + array.length;
      const res = await fetch(url2);
      const data = await res.json();
      console.log(data);
      if (array.length != data) {
        let idArray = [];
        data.forEach((element) => {
          idArray.push(element["_id"]);
        });
        console.log("ID Array : ", idArray);
        let newArray = [];
        array.forEach((element) => {
          if (idArray.includes(element["_id"])) {
            console.log("true");
            newArray.push(element);
          }
        });
        array = newArray;
        setQuestionList(newArray);
      }
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
      array.unshift(data);
      setQuestionList(array);
      setModalVisibility(false);
      //TOAST
    }
    setButtonLoading(false);
  };

  const fetchQuestionsOffline = async () => {
    const questionsString = await AsyncStorage.getItem("questions");
    console.log("QuestionString : ", questionsString);
    if (questionsString === null || questionsString === "[]") {
      return false;
    }

    const fetchedQuestions = JSON.parse(questionsString);
    array = fetchedQuestions;
    setQuestionList(fetchedQuestions);
    return true;
  };
  React.useEffect(() => {
    // const fetchQuestion = async () => {
    //   const url = "http://localhost:3000/getQuestions";
    //   const url2 = "https://coeproject.herokuapp.com/getQuestions";
    //   const res = await fetch(url2);
    //   const data = await res.json();
    //   console.log(data);
    //   array = data;
    //   setQuestionList(data);
    // };
    fetchQuestionsOffline().then((status) => {
      if (status === false) {
        // fetchQuestion();
      } else {
        // fetchNewQuestions();
      }
    });
    // await AsyncStorage.removeItem('questions')
  }, []);

  return (
    <View style={styles.container}>
      {questionsList ? (
        <ScrollView>
          {questionsList.map((question, index) => (
            <Question key={index} question={question} navigation={navigation} />
          ))}
        </ScrollView>
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
      <Modal dismissable={false} visible={filterModalVisibility}>
        <View style={styles.modalContainer}>
          <Text style={styles.chipTextStyle}>Filter</Text>
          <View style={{ flexDirection: "row", flexWrap: 1 }}>
            <Chip
              selected={filter === "YourPost"}
              mode="outlined"
              selectedColor="#563D74"
              style={
                filter === "YourPost" ? { backgroundColor: "#BB86FC" } : false
              }
              onPress={() => setFilter("YourPost")}
            >
              Your Posts
            </Chip>
            <Chip
              selected={filter === "DateUploaded"}
              mode="outlined"
              selectedColor="#563D74"
              style={
                filter === "DateUploaded"
                  ? { backgroundColor: "#BB86FC" }
                  : false
              }
              onPress={() => setFilter("DateUploaded")}
            >
              Date Uploaded
            </Chip>
            <Chip
              selected={filter === "Views"}
              mode="outlined"
              selectedColor="#563D74"
              style={
                filter === "Views" ? { backgroundColor: "#BB86FC" } : false
              }
              onPress={() => setFilter("Views")}
            >
              Views
            </Chip>
          </View>
          <Text style={styles.chipTextStyle}>Order</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Chip
              selected={orderFilter === "ASC"}
              mode="outlined"
              onPress={() => setOrderFilter("ASC")}
              selectedColor="#563D74"
              style={
                orderFilter === "ASC" ? { backgroundColor: "#BB86FC" } : false
              }
            >
              ASC
            </Chip>
            <Chip
              selected={orderFilter === "DESC"}
              mode="outlined"
              onPress={() => setOrderFilter("DESC")}
              selectedColor="#563D74"
              style={
                orderFilter === "DESC" ? { backgroundColor: "#BB86FC" } : false
              }
            >
              DESC
            </Chip>
          </View>
          <View style={styles.modelButtonView}>
            <Button
              icon="close"
              onPress={() => setFilterModalVisibility(false)}
            >
              Close
            </Button>
            <Button loading={isButtonLoading} icon="send">
              Select
            </Button>
          </View>
        </View>
      </Modal>
      {questionsList ? (
        <Appbar style={styles.bottom}>
          <Appbar.Action icon="plus" onPress={() => setModalVisibility(true)} />
          <Appbar.Action
            icon="filter"
            onPress={() => setFilterModalVisibility(true)}
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
  chipTextStyle: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  bottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

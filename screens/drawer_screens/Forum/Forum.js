import React, { useCallback, useState, useContext } from "react";
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

export default function Forum({ navigation }) {
  const { state } = useContext(userContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [questionsList, setQuestionList] = useState(null);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [orderFilter, setOrderFilter] = useState("ASC");
  const [filter, setFilter] = useState("DateUploaded");
  const [filterModalVisibility, setFilterModalVisibility] = useState(false);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const handleFilterModelVisibility = useCallback(
    (bool) => setFilterModalVisibility(bool),
    [filterModalVisibility]
  );
  const handleModelVisibility = useCallback(
    (bool) => setModalVisibility(bool),
    [modalVisibility]
  );

  const handleOrderFilter = useCallback((value) => setOrderFilter(value), [
    orderFilter,
  ]);

  const handleFilter = useCallback((value) => setFilter(value), [filter]);

  React.useEffect(() => {
    if (questionsList != null) {
      AsyncStorage.setItem("questions", JSON.stringify(questionsList))
        .then((data) => {
          console.log(data);
        })
        .catch(() => console.log("AsyncStorage Error"));
    }
  }, [questionsList]);

  // const fetchNewQuestions = useCallback(async () => {
  //   let array = [];
  //   console.log(questionsList);
  //   const lastDate = questionsList[0].dateAsked;
  //   const url =
  //     "https://coeproject.herokuapp.com/test/getQuestions/" + lastDate;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   if (data.length !== 0) {
  //     setQuestionList((oldArray) => [data, ...oldArray]);
  //   } else {
  //     const url =
  //       "https://coeproject.herokuapp.com/countQuestions/" + array.length;
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     if (array.length != data) {
  //       let idArray = [];
  //       data.forEach((element) => {
  //         idArray.push(element["_id"]);
  //       });
  //       console.log("ID Array : ", idArray);
  //       let newArray = [];
  //       array.forEach((element) => {
  //         if (idArray.includes(element["_id"])) {
  //           console.log("true");
  //           newArray.push(element);
  //         }
  //       });
  //       array = newArray;
  //       setQuestionList(newArray);
  //     }
  //   }
  // }, [questionsList]);

  const postQuestion = useCallback(
    async (title, body, id) => {
      setButtonLoading(true);
      const url = "https://coeproject.herokuapp.com/question-submit";
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
      if (res.status === 200) {
        const data = await res.json();
        setTitle("");
        setBody("");
        setQuestionList((oldArray) => [data, ...oldArray]);
        setModalVisibility(false);
      }
      setButtonLoading(false);
    },
    [questionsList]
  );

  React.useEffect(() => {
    // function to fetch question saved on device(offline)
    const fetchQuestionsOffline = async () => {
      const questionsString = await AsyncStorage.getItem("questions");
      const fetchedQuestions = JSON.parse(questionsString);
      if (!fetchedQuestions) {
        return false;
      }
      setQuestionList(fetchedQuestions);
      return true;
    };
    // function to fetch question from database incase offline data is not found
    const fetchQuestion = async () => {
      const url = "https://coeproject.herokuapp.com/getQuestions";
      const res = await fetch(url);
      const data = await res.json();
      array = data;
      setQuestionList(data);
    };
    fetchQuestionsOffline().then((status) => {
      if (status === false) {
        fetchQuestion();
      } else {
        // fetchNewQuestions();
      }
    });
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
            <Button icon="close" onPress={() => handleModelVisibility(false)}>
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
              onPress={() => handleFilter("YourPost")}
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
              onPress={() => handleFilter("DateUploaded")}
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
              onPress={() => handleFilter("Views")}
            >
              Views
            </Chip>
          </View>
          <Text style={styles.chipTextStyle}>Order</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Chip
              selected={orderFilter === "ASC"}
              mode="outlined"
              onPress={() => handleOrderFilter("ASC")}
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
              onPress={() => handleOrderFilter("DESC")}
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
              onPress={() => handleFilterModelVisibility(false)}
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
          <Appbar.Action
            icon="plus"
            onPress={() => handleModelVisibility(true)}
          />
          <Appbar.Action
            icon="filter"
            onPress={() => handleFilterModelVisibility(true)}
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

import React, { useState, useCallback, useEffect, useReducer } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { userContext } from "../screens/userContext";
//  import firebase from '../functions/firebase'

import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCHjNSh1e8JIu969bWygXqgxIsUbkmpRpQ",
  authDomain: "coeproject-24160.firebaseapp.com",
  databaseURL: "https://coeproject-24160.firebaseio.com",
  projectId: "coeproject-24160",
  storageBucket: "coeproject-24160.appspot.com",
  messagingSenderId: "404708360630",
  appId: "1:404708360630:web:76b5839fd35e81da1bc117",
  measurementId: "G-VHPX937EGR",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const database = firebase.database();

var connectedRef = firebase.database().ref(".info/connected");
connectedRef.on("value", function (snap) {
  if (snap.val() === true) {
    console.log("connected");
  } else {
    console.log("not connected");
  }
});
let lastMessageId = "";
export default function Chat({ navigation }) {
  const { state } = React.useContext(userContext);
  const [messages, setMessages] = useState([]);
  const user = state.user;

  const saveMessageToDatabase = useCallback((message) => {
    message.createdAt = Date.now();
    lastMessageId = message._id;
    database.ref("messages").push(message);
  }, []);
  useEffect(() => {
    // database
    //   .ref("messages/")
    //   .limitToLast(100)
    //   .once("value", (snapshot) => {
    //     let array = [];
    //     snapshot.forEach((childSnapshot) => {
    //       array.unshift(childSnapshot.val());
    //     });
    //     console.log(array);
    //     setMessages(array);
    //   });
    database
      .ref("messages")
      .limitToLast(100)
      .on("child_added", (snapshot) => {
        const messagesToAppend = snapshot.val();
        if (lastMessageId != messagesToAppend._id) {
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messagesToAppend)
          );
        }
      });
  }, []);

  const onSend = useCallback((message = []) => {
    saveMessageToDatabase(message[0]);
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, message)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      placeholder="Write a message"
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user._id,
        name: user.name,
        avatar: user.profilePic || null,
      }}
    />
  );
}

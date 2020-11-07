import React, { useState, useCallback, useEffect, useReducer } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { userContext } from "../screens/userContext";
require("../shared/firebase");
import firebase from "firebase";

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
      onSend={(messages) => onSend(messages)}
      renderUsernameOnMessage={true}
      isLoadingEarlier={true}
      user={{
        _id: user._id,
        name: user.name,
        avatar: user.profilePic || null,
      }}
      renderBubble={(props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: "#FE3636",
              },
              left: {
                backgroundColor: "#464746",
              },
            }}
            usernameStyle={{
              color: "#FFFFFF",
            }}
            textStyle={{
              right: {
                color: "#FFFFFF",
              },
              left: {
                color: "#FFFFFF",
              },
            }}
          />
        );
      }}
    />
  );
}

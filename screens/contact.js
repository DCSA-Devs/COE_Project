import React, { useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import * as MailComposer from "expo-mail-composer";

export default function Contact({ navigation }) {
  const [contacts, setContacts] = useState([
    {
      title: "coe project link",
      number: "2534813, 2534811",
      email: "a1coeproject@gmail.com",
      key: "1",
    },
  ]);

  const handleComposeMail = async () => {
    await MailComposer.composeAsync({
      recipients: ["a1coeproject@gmail.com"],
    });
  };
  return (
    <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      <View
        style={{
          padding: 20,
          justifyContent: "space-evenly",
        }}
      >
        <Text
          style={{
            color: "#6894E1",
            fontSize: 30,
            fontWeight: "bold",
            marginVertical: 20,
          }}
        >
          Contact US
        </Text>

        <View>
          <Text
            style={{
              fontSize: 16,
              color: "grey",
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Email :
          </Text>
          <Text
            onPress={handleComposeMail}
            style={{ color: "#5A88DA", fontSize: 18, marginBottom: 15 }}
          >
            a1coeproject@gmail.com
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "grey",
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Phone :
          </Text>
          <Text style={{ color: "#5A88DA", fontSize: 18 }} CC>
            (+91)9999999999
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-end",
          justifyContent: "flex-end",
        }}
      >
        <ImageBackground
          source={require("../assets/images/malibox.jpg")}
          style={{ height: 400, width: 400 }}
        ></ImageBackground>
      </View>
    </View>
  );
}

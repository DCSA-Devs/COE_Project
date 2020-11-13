import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Card from "../../shared/card";
import * as MailComposer from "expo-mail-composer";
export default function ContactDetails(props) {
  const { title, number, email } = props.route.params.item;

  const handleComposeMail = async () => {
    await MailComposer.composeAsync({
      recipients: [email],
    });
  };
  return (
    <View>
      <Card>
        <Text style={styles.desig}>{title}</Text>
        <Text style={styles.contactText}>Phone number : {number}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.contactText}>Email:</Text>

          <Text
            onPress={handleComposeMail}
            style={[
              styles.contactText,
              {
                color: "blue",
                borderBottomWidth: 1,
                paddingBottom: 1,
                borderBottomColor: "blue",
              },
            ]}
          >
            {email}
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  contactText: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 18,
  },
  desig: {
    margin: 5,
    fontWeight: "bold",
    fontSize: 20,
    color: "blue",
  },
});

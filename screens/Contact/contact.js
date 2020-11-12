import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Card from "../../shared/card";

export default function Contact({ navigation }) {
  const [contacts, setContacts] = useState([
    {
      title: "coe project link (For Technical help!)",
      number: "2534813, 2534811",
      email: "a1coeproject@gmail.com",
      key: "1",
    },
    // {
    //   title: "Vice-Chancellor",
    //   number: "2534299, 2534297, 2534293",
    //   email: "vc@pu.ac.in",
    //   key: "2",
    // },
    // {
    //   title: "Dean University Instructions",
    //   number: "2534292, 2534291, 2534290",
    //   email: "dui@pu.ac.in",
    //   key: "3",
    // },
    // {
    //   title: "Registrar",
    //   number: "2534867, 2534868",
    //   email: "regr@pu.ac.in",
    //   key: "4",
    // },
    // {
    //   title: "Dean Student Welfare",
    //   number: "2534565, 2541596",
    //   email: "dsw@pu.ac.in",
    //   key: "5",
    // },
    // {
    //   title: "Librarian",
    //   number: "2548159, 2534551",
    //   email: "librarian@pu.ac.in",
    //   key: "6",
    // },
    // {
    //   title: "Chief Medical Officer",
    //   number: 2534477,
    //   email: "bgjih@pu.ac.in",
    //   key: "7",
    // },
    // {
    //   title: "Director Public Relations",
    //   number: 2534865,
    //   email: "dpr@pu.ac.in",
    //   key: "8",
    // },
    // {
    //   title: "Dean International Students",
    //   number: "2541873, 2534574",
    //   email: "dis@pu.ac.in",
    //   key: "9",
    // },
    // {
    //   title: "Dean Alumni Relations",
    //   number: "2541881, 2534575",
    //   email: "darpu@pu.ac.in",
    //   key: "10",
    // },
    // {
    //   title: "Director, Computer Centre",
    //   number: "2534064",
    //   email: "directorcc@pu.ac.in",
    //   key: "11",
    // },
    // {
    //   title: "Director Registrar (General)",
    //   number: "2534857",
    //   email: "drg@pu.ac.in",
    //   key: "12",
    // },
    // {
    //   title: "Director Registrar (Colleges)",
    //   number: "2534805",
    //   email: "drcolleges@pu.ac.in",
    //   key: "13",
    // },
    // {
    //   title: "Website Management Team",
    //   number: "12345678910",
    //   email: "abc@gmail.com",
    //   key: "14",
    // },
  ]);

  return (
    <FlatList
      data={contacts}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ContactDetails", { item });
          }}
        >
          <Card>
            <Text>{item.title}</Text>
          </Card>
        </TouchableOpacity>
      )}
      ListHeaderComponent={
        <>
          <View style={styles.heading}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                letterSpacing: 1,
              }}
            >
              For Technical Help!
            </Text>
          </View>
          {/* <View style={styles.designation}>
            <Text style={{ fontWeight: "bold", fontSize: 18, color: "blue" }}>
              Designation
            </Text>
          </View> */}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    backgroundColor: "#3d5a80",
    justifyContent: "center",
    textAlign: "center",
    padding: 20,
    borderRadius: 20,
    height: 50,
    // color: 'white',
    fontWeight: "800",
    letterSpacing: 1,
    margin: 10,
  },
  // designation: {
  //   fontWeight: "bold",
  //   marginLeft: 10,
  //   margin: 3,
  // },
});

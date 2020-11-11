import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import DocumentCard from "./DocumentCard";
import AsyncStorage from "@react-native-community/async-storage";
export default function Document({ route }) {
  const [docs, setDocs] = React.useState(null);
  const name = route.params.name;

  useEffect(() => {
    const uri = route.params.uri;
    //function to fetch docs array from server
    const fetchDocs = async () => {
      const res = await fetch(uri);
      const data = await res.json();
      setDocs(data);
    };
    // function to fetch docs saved on device
    const fetchDocsOffline = async () => {
      const data = await AsyncStorage.getItem(name);
      const docsFetchedOffline = JSON.parse(data);
      if (docsFetchedOffline) {
        setDocs(docsFetchedOffline);
      } else {
        fetchDocs();
      }
    };
    fetchDocsOffline();
  }, []);
  useEffect(() => {
    // function to save docs for offline access
    const persistDoc = async () => {
      if (docs != null) {
        await AsyncStorage.setItem(name, JSON.stringify(docs));
      }
    };
    persistDoc();
  }, [docs]);
  return (
    <View style={styles.container}>
      {docs ? (
        <ScrollView>
          {docs.map((doc, index) => (
            <DocumentCard key={index} doc={doc} />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
            Fetching Documents
          </Text>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

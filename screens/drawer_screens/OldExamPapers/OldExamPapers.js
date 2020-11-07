import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, ActivityIndicator } from "react-native-paper";
import DocumentCard from "./DocumentCard";
export default function OldExamPapers({ navigation, question }) {
  const [docs, setDocs] = React.useState(null);
  useEffect(() => {
    const fetchDocs = async () => {
      const res = await fetch(
        "https://coeproject.herokuapp.com/getSamplePapers"
      );
      const data = await res.json();
      setDocs(data);
    };
    fetchDocs();
  }, []);
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

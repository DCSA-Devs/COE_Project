import React from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function LectureVideo({ navigation }) {
  const [videos, setVideos] = React.useState(null);
  React.useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("https://coeproject.herokuapp.com/video");
      const data = await res.json();
      console.log(data);
      setVideos(data);
    };
    fetchVideos();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {videos ? (
        <FlatList
          style={styles.flatlistStyle}
          data={videos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.touchStyles}
              onPress={() =>
                navigation.navigate("VideoPlayer", { video: item })
              }
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ padding: 20, fontSize: 20, fontWeight: "bold" }}>
            Fetching Videos
          </Text>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  flatlistStyle: {
    margin: 10,
  },
  touchStyles: {
    padding: 10,
    margin: 5,
    backgroundColor: "rgb(142, 173, 255 )",
    borderRadius: 5,
  },
});

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
// const lectureData = [
//   {
//     title: "Introduction to Subject",
//     link:
//       "https://udemy.pundeermaza.xyz/?/Udemy%20-%20Flutter%20%26%20Dart%20-%20The%20Complete%20Guide%20%5B2020%20Edition%5D/12.%20Adding%20Animations%20%5BSHOP%20APP%5D/1.%20Module%20Introduction.mp4",
//     key: "1",
//   },
//   { title: "First Chapter", link: "", key: "2" },
//   { title: "Second Chapter", link: "", key: "3" },
//   { title: "Third Chapter", link: "", key: "4" },
//   { title: "Fourth Chapter", link: "", key: "5" },
//   { title: "Fifth Chapter", link: "", key: "6" },
//   { title: "Sixth Chapter", link: "", key: "7" },
// ];
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

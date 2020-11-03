import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Video } from "expo-av";

export default function VideoPlayerScreen({ navigation, route }) {
  const video = route.params.video;
  return (
    <View>
      <Video
        source={{
          uri: video.url,
        }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls={true}
        style={{ width: "100%" }}
      />
      <View style={styles.descriptionView}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.content}>
          "This is where description of our video will come"
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  descriptionView: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    marginTop: 10,
    fontSize: 16,
  },
});

import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
export default function VideoPlayerScreen() {
  return (
    <View style={styles.container}>
      <VideoPlayer 
        videoProps={{
          useNativeControls:true,
          shouldPlay: true,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          },
        }}

        showFullscreenButton={true}
      />
    </View>

  );
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"white",
  }
}
);
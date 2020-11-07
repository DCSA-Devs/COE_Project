import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";

import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Button } from "react-native-paper";

export default function DocumentCard({ navigation, doc }) {
  const [progress, setProgress] = React.useState(0);
  const [visible, setVisible] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);
  const ext = doc.name.substr(doc.name.lastIndexOf(".") + 1);
  const callback = (downloadProgress) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setProgress(Math.floor(progress * 100));
  };
  const downloadResumable = FileSystem.createDownloadResumable(
    doc.link,
    FileSystem.documentDirectory + doc.name,
    {},
    callback
  );
  React.useEffect(() => {
    const doesFileExists = async () => {
      const file = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + doc.name
      );
      console.log("File", file);
      if (file.exists === true) {
        setDownloaded(true);
      }
    };
    doesFileExists();
  }, []);
  const download = React.useCallback(async () => {
    setVisible(true);
    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      setVisible(false);
      setProgress(0);
      setDownloaded(true);
    } catch (e) {
      console.error(e);
    }
  }, []);
  const deleteFile = React.useCallback(async () => {
    const res = await FileSystem.deleteAsync(
      FileSystem.documentDirectory + doc.name,
      { idempotent: true }
    );
    console.log(res);
    setDownloaded(false);
  }, []);
  const viewFile = () =>
    FileSystem.getContentUriAsync(FileSystem.documentDirectory + doc.name).then(
      (cUri) => {
        console.log(cUri);
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        });
      }
    );

  return (
    <View style={styles.question}>
      <Image
        source={require("../../../assets/images/Sampledocx.png")}
        style={{ width: 70, height: 70 }}
      />
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          flexShrink: 1,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {doc.name.split(".")[0]}
        </Text>
        <Text style={{ color: "grey", textTransform: "capitalize" }}>
          {doc.size}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          {!downloaded ? (
            <TouchableOpacity
              onPress={download}
              style={styles.TouchableButtons}
            >
              <Text style={{ color: "white" }}>
                {visible ? "Downloading " + progress + "%" : "Download"}
              </Text>
            </TouchableOpacity>
          ) : (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={viewFile}
                  style={[styles.TouchableButtons, { marginRight: 4 }]}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteFile}
                  style={styles.TouchableButtons}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          <Text>{doc.year}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  question: {
    margin: 5,
    marginHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  TouchableButtons: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#E74C3C",
  },
});

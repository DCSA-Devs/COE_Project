import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import React, { useCallback } from "react";
import { IconButton, ActivityIndicator } from "react-native-paper";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import pdf from "../../../assets/images/Samplepdf.png";
import doc from "../../../assets/images/Sampledoc.png";
import docx from "../../../assets/images/Sampledocx.png";

export default function DocumentCard({ doc }) {
  const [progress, setProgress] = React.useState(0);
  const [downloading, setDownloading] = React.useState(false);
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
  const downloadFile = React.useCallback(async () => {
    setDownloading(true);
    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log("Finished downloading to ", uri);
      setDownloading(false);
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
  const shareFile = React.useCallback(
    () => Sharing.shareAsync(FileSystem.documentDirectory + doc.name),
    []
  );

  return (
    <View style={styles.question}>
      <Image
        source={require("../../../assets/images/Samplepdf" + ".png")}
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
          {doc.year}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: 3,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              borderRadius: 10,
              backgroundColor: "#F3F3F4",
            }}
          >
            {!downloaded ? (
              downloading ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                  }}
                >
                  <ActivityIndicator color="black" />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginLeft: 10,
                    }}
                  >
                    {progress + "%"}{" "}
                  </Text>
                </View>
              ) : (
                  <IconButton icon="download" onPress={downloadFile} />
                )
            ) : (
                <>
                  <IconButton icon="book-open-variant" onPress={viewFile} />
                  <IconButton icon="share" onPress={shareFile} />
                  <IconButton icon="delete" onPress={deleteFile} />
                </>
              )}
          </View>
          <Text>{doc.size}</Text>
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
});

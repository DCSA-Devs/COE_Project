import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
export default function DepartmentScreenGenerator({
  navigationProp,
  screenItems,
}) {
  return (
    <TouchableOpacity
      style={styles.touchableOpacityStyle}
      onPress={() =>
        navigationProp.push(screenItems.component, {
          uri: screenItems.uri,
          name: screenItems.name,
        })
      }
    >
      <Image
        source={screenItems.imgSrc}
        style={{
          width: 90,
          height: 90,
          tintColor: "black",
          // "#6a040f"
          // "rgba(89,89,89, 1)",
        }}
      />
      <Text style={styles.componentTextStyle}>{screenItems.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#98c1d9",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  componentTextStyle: {
    marginTop: 10,
    color: "#463f3a",
    // "rgba(89,89,89, 1)",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
export default function DepartmentScreenGenerator({
  navigationProp,
  screenItems,
}) {
  return (
    <TouchableOpacity
      style={styles.touchableOpacityStyle}
      onPress={() => navigationProp.push(screenItems.component)}
    >
      <Image
        source={screenItems.imgSrc}
        style={{
          width: 110,
          height: 110,
          tintColor: "rgba(89,89,89, 1)",
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
    padding: 10,
    margin: 10,
    backgroundColor: "rgba(246,129,129,0.4)",
    borderRadius: 10,
  },
  componentTextStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});

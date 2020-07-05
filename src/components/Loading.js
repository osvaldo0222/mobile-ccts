import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import LogoTemplate from "../components/LogoTemplate";
import { secondaryColor, primaryColor, captionColor } from "../utils/Colors";

const Loading = () => {
  return (
    <View style={styles.container}>
      <LogoTemplate />
      <ActivityIndicator size="large" color={primaryColor} />
      <Text h3 style={styles.text}>
        CCTS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: secondaryColor,
  },
  text: {
    position: "absolute",
    bottom: 10,
    color: captionColor,
  },
});

export default Loading;

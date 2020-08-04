import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryColor } from "../utils/Colors";

const Line = ({ iconName, text, iconSize, textStyle }) => {
  return (
    <View style={styles.container}>
      <View>
        <Icon
          name={iconName}
          color={primaryColor}
          size={iconSize ? iconSize : 20}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={{ textAlign: "justify", ...textStyle }}>{`${text}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingRight: 15,
    marginTop: 6,
  },
  textContainer: {
    paddingLeft: 8,
    paddingRight: 20,
  },
});

export default Line;

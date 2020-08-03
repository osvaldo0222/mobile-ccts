import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { primaryColor } from "../../utils/Colors";

const CardComponent = ({
  subject,
  subjectIcon,
  iconName,
  colorIcon,
  total,
  newest,
  marginBottom,
  subjectColor,
}) => {
  return (
    <View style={[styles.card, { marginBottom }]}>
      <View style={styles.cardBody}>
        <Text style={styles.cardText}>{total}</Text>
        <Text
          style={[
            styles.subCardText,
            { color: subjectColor ? subjectColor : "gray" },
          ]}
        >
          {subject} {subjectIcon}
          <Text style={{ color: subjectColor ? subjectColor : primaryColor }}>
            {newest}
          </Text>
        </Text>
      </View>
      <View>
        <FontAwesome5
          name={`${iconName}`}
          style={styles.icon}
          color={colorIcon}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    height: "15%",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardBody: {
    margin: 10,
  },
  cardText: {
    fontSize: 30,
  },
  icon: {
    fontSize: 30,
    paddingRight: 20,
  },
  subCardText: {
    fontSize: 12,
    color: "gray",
  },
});

export default CardComponent;

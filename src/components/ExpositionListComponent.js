import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { NavigationContext } from "@react-navigation/native";
import { primaryColor } from "../utils/Colors";

const ExpositionListComponent = ({ item }) => {
  const navigation = useContext(NavigationContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("VisitExposition", {
          item: item.visit,
        });
      }}
    >
      <ListItem
        title={item.visit.locality.name}
        titleStyle={styles.title}
        subtitle={
          <>
            <Text>{item.date}</Text>
            <Text>{item.comment}</Text>
            <Text>{`${item.visit.locality.address.city}, ${item.visit.locality.address.country}`}</Text>
          </>
        }
        leftAvatar={{
          source: require("../../assets/logo.png"),
          rounded: false,
        }}
        bottomDivider
        chevron={{ color: primaryColor }}
        badge={{
          status: item.exposition ? "error" : "success",
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: primaryColor,
    fontWeight: "bold",
  },
});

export default ExpositionListComponent;

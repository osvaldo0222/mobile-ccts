import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { NavigationContext } from "@react-navigation/native";
import { primaryColor } from "../utils/Colors";

const VisitListComponent = ({ item }) => {
  const navigation = useContext(NavigationContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Visit", { item: item });
      }}
    >
      <ListItem
        title={item.locality.name}
        titleStyle={styles.title}
        subtitle={
          <>
            <Text>Llegada: {item.timeArrived}</Text>
            <Text>Salida: {item.timeLeft}</Text>
            <Text>{`${item.locality.address.city}, ${item.locality.address.country}`}</Text>
          </>
        }
        leftAvatar={{
          source: require("../../assets/home.png"),
          rounded: false,
        }}
        bottomDivider
        chevron={{ color: primaryColor }}
        badge={{
          status:
            item.expositionProbability > 0.6
              ? "error"
              : item.expositionProbability > 0.3
                ? "warning"
                : "success",
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

export default VisitListComponent;

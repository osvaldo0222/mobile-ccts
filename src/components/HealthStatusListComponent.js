import React, { useContext } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ListItem, Text } from "react-native-elements";
import { NavigationContext } from "@react-navigation/native";
import { primaryColor } from "../utils/Colors";

const HealthStatusListComponent = ({ item }) => {
  const navigation = useContext(NavigationContext);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("HealthStatusView", { item: item });
      }}
    >
      <ListItem
        title={item.statusDate}
        titleStyle={styles.title}
        subtitle={
          <>
            <Text>Sintomas: {item.symptons}</Text>
            <Text>Estado: {item.status ? "Positivo" : "Negativo"}</Text>
          </>
        }
        leftAvatar={{
          source: require("../../assets/report.png"),
          rounded: false,
        }}
        bottomDivider
        chevron={{ color: primaryColor }}
        badge={{
          status: item.status ? "error" : "success",
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

export default HealthStatusListComponent;

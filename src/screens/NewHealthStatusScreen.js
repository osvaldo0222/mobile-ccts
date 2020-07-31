import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Switch,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { ListItem, Button, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AppHeader from "../components/AppHeader";
import { primaryColor, secondaryColor } from "../utils/Colors";
import { Context as HealthStatusContext } from "../context/HealthStatusContext";
import { NavigationContext } from "@react-navigation/native";

const symptons = [
  {
    id: "fever",
    title: "Fiebre",
    subtitle: "Temperatura por encima de 37°C",
  },
  {
    id: "cough",
    title: "Tos",
    subtitle: "Tos frecuentemente",
  },
  {
    id: "breathDifficulty",
    title: "Respiracion",
    subtitle: "Imposible respirar con naturaleza",
  },
  {
    id: "soreThroat",
    title: "Dolor de Garganta",
    subtitle: "Molestias en la garganta",
  },
  {
    id: "smellLoss",
    title: "Olfato",
    subtitle: "Perdida del olfato",
  },
  {
    id: "tasteLoss",
    title: "Sabor",
    subtitle: "Perdida de sabor",
  },
];

const SymptomsComponent = ({ id, title, subtitle, selected, setSelected }) => {
  const toggleSwitch = () => {
    setSelected((current) => {
      current[id] = !current[id];
      return { ...current };
    });
  };

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <ListItem
        title={title}
        titleStyle={styles.title}
        subtitle={
          <>
            <Text>{subtitle}</Text>
          </>
        }
        rightElement={() => (
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={selected[id] ? primaryColor : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={selected[id]}
          />
        )}
        bottomDivider
      />
    </TouchableWithoutFeedback>
  );
};

const NewHealthStatusScreen = () => {
  const {
    state: { error },
    submitHealthStatus,
    clearHealthStatusError,
  } = useContext(HealthStatusContext);
  const navigation = useContext(NavigationContext);
  const [selected, setSelected] = useState({
    fever: false,
    cough: false,
    breathDifficulty: false,
    soreThroat: false,
    smellLoss: false,
    tasteLoss: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const blurNavListener = navigation.addListener("focus", () =>
      clearHealthStatusError()
    );

    return blurNavListener;
  }, [navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        "Error",
        error,
        [
          {
            text: "OK",
            onPress: () => console.log("OK"),
          },
        ],
        { cancelable: true }
      );
    }
  }, [error]);

  return (
    <View style={{ flex: 1, backgroundColor: secondaryColor }}>
      <AppHeader title="Nuevo Reporte" />
      <View style={{ margin: 10, flexDirection: "row" }}>
        <Icon name="gesture-tap" size={24} color={primaryColor} />
        <Text style={{ fontSize: 17 }}>
          {`  `}Seleccione los sintomas que sienta:
        </Text>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={symptons}
        renderItem={({ item }) => (
          <SymptomsComponent
            {...item}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      />
      <Button
        title="   Registrar"
        type="solid"
        icon={<Icon name="book-plus" size={24} color="#fff" />}
        containerStyle={{
          margin: 10,
          backgroundColor: primaryColor,
          borderRadius: 15,
        }}
        loading={loading}
        onPress={async () => {
          setLoading(true);
          await submitHealthStatus({ ...selected });
          setSelected({
            fever: false,
            cough: false,
            breathDifficulty: false,
            soreThroat: false,
            smellLoss: false,
            tasteLoss: false,
          });
          setLoading(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: primaryColor,
    fontWeight: "bold",
  },
});

export default NewHealthStatusScreen;

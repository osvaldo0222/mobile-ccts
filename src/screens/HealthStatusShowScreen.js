import React from "react";
import { ScrollView, StyleSheet, YellowBox, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { primaryColor } from "../utils/Colors";
import Line from "../components/Line";

const HealthStatusShowScreen = ({
  route: {
    params: { item },
  },
}) => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Card
        containerStyle={styles.card}
        title={"Reporte de salud"}
        titleStyle={styles.title}
        dividerStyle={styles.divider}
      >
        <Line iconName="calendar-range" text={item.statusDate} />
        <Line
          iconName="biohazard"
          text={`${item.status ? "Positivo" : "Negativo"} al virus`}
        />
        <Line
          iconName="braille"
          text={`Sintomas presentados:`}
          textStyle={{ fontWeight: "bold" }}
        />
        <Line
          iconName="circle-small"
          text={`Fiebre: ${item.fever ? "Si" : "No"}`}
          iconSize={25}
        />
        <Line
          iconName="circle-small"
          text={`Tos: ${item.cough ? "Si" : "No"}`}
          iconSize={25}
        />
        <Line
          iconName="circle-small"
          text={`Dificultad respiratoria: ${
            item.breathDifficulty ? "Si" : "No"
          }`}
          iconSize={25}
        />
        <Line
          iconName="circle-small"
          text={`Dolor de garganta: ${item.soreThroat ? "Si" : "No"}`}
          iconSize={23}
        />
        <Line
          iconName="circle-small"
          text={`Pérdida del olfato: ${item.smellLoss ? "Si" : "No"}`}
          iconSize={25}
        />
        <Line
          iconName="circle-small"
          text={`Pérdida de sabor: ${item.tasteLoss ? "Si" : "No"}`}
          iconSize={25}
        />
      </Card>
      <Card
        containerStyle={styles.card}
        title="Recomendaciones"
        titleStyle={styles.title}
        dividerStyle={styles.divider}
      >
        <FlatList
          style={{ marginTop: 10 }}
          keyExtractor={(item) => item}
          data={item.recommendations}
          renderItem={({ item }) => (
            <Line iconName="circle-small" text={`${item}`} iconSize={25} />
          )}
        />
      </Card>
    </ScrollView>
  );
};

YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  card: {
    borderRadius: 15,
  },
  title: {
    color: primaryColor,
  },
  divider: {
    backgroundColor: primaryColor,
  },
  map: {
    width: "100%",
    height: 250,
  },
});

export default HealthStatusShowScreen;

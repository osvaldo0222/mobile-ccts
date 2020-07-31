import React from "react";
import { ScrollView, StyleSheet, YellowBox, FlatList } from "react-native";
import { Text, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryColor } from "../utils/Colors";

const HealthStatusShowScreen = ({
  route: {
    params: { item },
  },
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card
        containerStyle={styles.card}
        title={"Reporte de salud"}
        titleStyle={styles.title}
        dividerStyle={styles.divider}
      >
        <Text>
          <Icon name="calendar-range" color={primaryColor} />
          {`  ${item.statusDate}`}
        </Text>
        <Text>
          <Icon name="biohazard" color={primaryColor} />
          {`  ${item.status ? "Positivo" : "Negativo"} al virus`}
        </Text>
        <Text style={{ fontWeight: "bold", marginTop: 10 }}>
          <Icon name="braille" color={primaryColor} />
          {`  Sintomas presentados:`}
        </Text>
        <Text>
          <Icon name="circle-small" color={primaryColor} />
          {`  Fiebre: ${item.fever ? "Si" : "No"}`}
        </Text>
        <Text>
          <Icon name="circle-small" color={primaryColor} />
          {`  Tos: ${item.cough ? "Si" : "No"}`}
        </Text>
        <Text>
          <Icon name="circle-small" color={primaryColor} />
          {`  Dificultad respiratoria: ${item.breathDifficulty ? "Si" : "No"}`}
        </Text>
        <Text>
          <Icon name="circle-small" color={primaryColor} />
          {`  Dolor de garganta: ${item.soreThroat ? "Si" : "No"}`}
        </Text>
        <Text>
          <Icon name="circle-small" color={primaryColor} />
          {`  Pérdida del olfato: ${item.smellLoss ? "Si" : "No"}`}
        </Text>
        <Text>
          <Icon name="circle-small" color={primaryColor} />
          {`  Pérdida de sabor: ${item.tasteLoss ? "Si" : "No"}`}
        </Text>
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
            <Text>
              <Icon name="circle-small" color={primaryColor} />
              {`  ${item}`}
            </Text>
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

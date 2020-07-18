import React from "react";
import { ScrollView, FlatList, StyleSheet, YellowBox } from "react-native";
import { Text, Card, Divider } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import { primaryColor } from "../utils/Colors";

const VisitShowScreen = ({
  route: {
    params: { item },
  },
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card
        containerStyle={styles.card}
        title={item.locality.name}
        titleStyle={styles.title}
        dividerStyle={styles.divider}
      >
        <MapView
          style={styles.map}
          region={{
            ...item.locality.gpsLocation,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          minZoomLevel={4}
          loadingEnabled={true}
          loadingIndicatorColor={primaryColor}
          loadingBackgroundColor="#fff"
        >
          <Marker
            coordinate={item.locality.gpsLocation}
            title={item.locality.name}
            description={"Por esta localidad se reportó la visita"}
          />
        </MapView>
        <Divider style={[{ marginVertical: 18 }, styles.divider]} />
        <Text>
          <Icon name="crosshairs-gps" color={primaryColor} />
          {`  ${item.locality.address.city}, ${item.locality.address.direction}. ${item.locality.address.country}`}
        </Text>
        <Text>
          <Icon name="rss-box" color={primaryColor} />
          {`  ${item.locality.nodeCount} Dispositivos Activos`}
        </Text>
        <Text>
          <Icon name="check-all" color={primaryColor} />
          {`  ${item.locality.confirmCases} Casos Confirmados`}
        </Text>
        <Text>
          <Icon name="check" color={primaryColor} />
          {`  ${item.locality.suspectsCases} Casos Sospechosos`}
        </Text>
      </Card>
      <Card
        containerStyle={styles.card}
        title="Información de visita"
        titleStyle={styles.title}
        dividerStyle={styles.divider}
      >
        <Text>
          <Icon name="location-enter" color={primaryColor} />
          {`  Llegada: ${item.timeArrived}`}
        </Text>
        <Text>
          <Icon name="location-exit" color={primaryColor} />
          {`  Salida: ${item.timeLeft}`}
        </Text>
        <Text>
          <Icon name="percent" color={primaryColor} />
          {`  Porciento de exposicion: ${item.expositionProbability * 100} %`}
        </Text>
        <FlatList
          style={{ marginTop: 10 }}
          keyExtractor={(item) => item.id.toString()}
          data={item.nodes}
          renderItem={({ item }) => (
            <Text>
              <Icon name="circle-small" color={primaryColor} />
              {`  ${item.description}`}
            </Text>
          )}
          ListHeaderComponent={() => (
            <Text style={{ fontWeight: "bold" }}>
              <Icon name="devices" color={primaryColor} />
              {`  Dispositivos registrados:`}
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

export default VisitShowScreen;

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  FlatList,
  StyleSheet,
  YellowBox,
  Platform,
  LogBox,
} from "react-native";
import { Card, Divider } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import { primaryColor } from "../utils/Colors";
import Line from "../components/Line";

const VisitShowScreen = ({
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
          minZoomLevel={Platform.OS === "android" ? 16 : 0}
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
        <Line
          iconName="crosshairs-gps"
          text={`${item.locality.address.city}, ${item.locality.address.direction}. ${item.locality.address.country}`}
        />
        <Line
          iconName="rss-box"
          text={`${item.locality.nodeCount} Dispositivos Activos`}
        />
        <Line
          iconName="check-all"
          text={`${item.locality.confirmCases} Casos Confirmados`}
        />
        <Line
          iconName="check"
          text={`${item.locality.suspectsCases} Casos Sospechosos`}
        />
      </Card>
      <Card
        containerStyle={styles.card}
        title="Información de visita"
        titleStyle={styles.title}
        dividerStyle={styles.divider}
      >
        <Line iconName="location-enter" text={`Llegada: ${item.timeArrived}`} />
        <Line iconName="location-exit" text={`Salida: ${item.timeLeft}`} />
        <Line
          iconName="percent"
          text={`Porciento de exposicion: ${item.expositionProbability * 100
            } %`}
        />
        <FlatList
          style={{ marginTop: 10 }}
          keyExtractor={(item) => item.id.toString()}
          data={item.nodes}
          renderItem={({ item }) => (
            <Line
              iconName="circle-small"
              text={`${item.description}`}
              iconSize={23}
            />
          )}
          ListHeaderComponent={() => (
            <Line
              iconName="devices"
              text={`Dispositivos registrados:`}
              textStyle={{ fontWeight: "bold" }}
            />
          )}
        />
      </Card>
    </ScrollView>
  );
};

/*YellowBox.ignoreWarnings([
  "VirtualizedLists should never be nested", // TODO: Remove when fixed
]);*/

LogBox.ignoreAllLogs(true);

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

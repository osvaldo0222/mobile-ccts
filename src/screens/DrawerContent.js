import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryColor, borderLineColor, captionColor } from "../utils/Colors";
import useJwt from "../hooks/useJwt";

export function DrawerContent(props) {
  const [subject, name, authorities, loginDate] = useJwt();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar
                rounded
                title={name.slice(0, 2).toUpperCase()}
                size="medium"
                containerStyle={{ backgroundColor: primaryColor }}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.caption}>@{subject}</Text>
              </View>
            </View>
          </View>

          <View style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Inicio"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="crosshairs" color={color} size={size} />
              )}
              label="Visitas"
              onPress={() => {
                props.navigation.navigate("Visits");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="counter" color={color} size={size} />
              )}
              label="Estadisticas"
              onPress={() => {
                props.navigation.navigate("Statistics");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="email-outline" color={color} size={size} />
              )}
              label="Notificaciones"
              onPress={() => {
                props.navigation.navigate("Notifications");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="plus" color={color} size={size} />
              )}
              label="Estado de Salud"
              onPress={() => {
                props.navigation.navigate("HealthStatus");
              }}
            />

            {/*<DrawerItem
              icon={({ color, size }) => (
                <Icon name="settings" color={color} size={size} />
              )}
              label="Configuraciones"
              onPress={() => {}}
              />*/}
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Cerrar Sesión"
          onPress={() => {
            props.navigation.navigate("Logout");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingTop: 10,
    paddingBottom: 30,
    paddingLeft: 20,
    borderBottomColor: borderLineColor,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    marginTop: 8,
    color: captionColor,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    paddingVertical: 8,
    borderBottomColor: borderLineColor,
    borderBottomWidth: 1,
  },
  bottomDrawerSection: {
    paddingVertical: 8,
    borderTopColor: borderLineColor,
    borderTopWidth: 1,
  },
});

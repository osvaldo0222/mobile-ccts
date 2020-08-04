import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Card, Button, Icon, Badge } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import Loading from "../components/Loading";
import useJwt from "../hooks/useJwt";
import { Context as NotificationContext } from "../context/NotificationContext";
import { Context as ExpositionContext } from "../context/ExpositionContext";
import { primaryColor } from "../utils/Colors";

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const Home = ({ navigation }) => {
  const {
    state: { notifications },
    fetchNotifications,
  } = useContext(NotificationContext);
  const {
    state: { status },
    fetchStatus,
  } = useContext(ExpositionContext);
  const [refreshing, setRefreshing] = useState(true);
  const [notificationsBagde, setNotificationsBagde] = useState(0);
  const [state, setState] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [activeDays, setActiveDays] = useState(1);
  const [subject, name, authorities, loginDate] = useJwt();

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      onRefresh();

      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      };
    },
  });

  useEffect(() => {
    if (refreshing) {
      let auxDate = new Date();
      let dateToCopy = `${
        monthNames[auxDate.getMonth()]
      }, ${auxDate.getDate()}`;
      let hours = auxDate.getHours();
      let minutes = auxDate.getMinutes();
      let time = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }`;

      notificationRefresh();
      fetchStatus();
      setDate(dateToCopy);
      setTime(time);
      setState(true);
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    if (loginDate) {
      setActiveDays(
        Math.round(
          (new Date().getTime() - loginDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      );
    }
  }, [loginDate, refreshing]);

  useEffect(() => {
    setNotificationsBagde(
      notifications.length ? notifications[0].data.length : 0
    );
  }, [notifications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
  }, []);

  const notificationRefresh = useCallback(async () => {
    await fetchNotifications(0);
  }, []);

  return (
    <>
      <AppHeader title="Inicio" />
      {state ? (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.view}>
              <View>
                <Text style={styles.dateHeaderStyle}>{date}</Text>
                <Text style={styles.dateWelcomeStyle}>Bienvenido {name}</Text>
              </View>
              <Card
                title="¿Sientes estos sintomas? "
                containerStyle={[{ borderRadius: 15 }, styles.shadow]}
              >
                <Text style={styles.symptons}>
                  Fiebre o escalofríos, tos, dificultad para respirar, fatiga,
                  dolores musculares, dolor de cabeza, pérdida del olfato o el
                  gusto, dolor de garganta, moqueo.
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("HealthStatus", {
                      screen: "NewReport",
                    });
                  }}
                >
                  <Button
                    buttonStyle={styles.reportSymtons}
                    title="  Reportar sintomas"
                  />
                </TouchableOpacity>
              </Card>
              <View style={[styles.riskCard, styles.shadow]}>
                <View
                  style={[
                    styles.flexAndCenter,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={{
                      marginLeft: 35,
                      marginTop: 30,
                      fontSize: 25,
                      color: "black",
                    }}
                  >
                    Riesgo {status.comment}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("HealthStatus", {
                        screen: "Exposition",
                      });
                    }}
                  >
                    <AntDesign
                      name="arrowright"
                      size={35}
                      color="black"
                      style={{ marginRight: 35, marginTop: 30 }}
                    />
                  </TouchableOpacity>
                </View>
                <View style={[styles.flexAndCenter, styles.info]}>
                  <MaterialCommunityIcons
                    name="bacteria"
                    size={24}
                    color="#FC0000"
                    style={styles.cardIco}
                  />
                  <Text>
                    Se ha detectado{" "}
                    {status.percentage < 33.33
                      ? "baja"
                      : status.percentage < 66.66
                      ? "media"
                      : "alta"}{" "}
                    exposición
                  </Text>
                </View>
                <View style={[styles.flexAndCenter, styles.info]}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={24}
                    color={
                      status.percentage < 33.33
                        ? "#87C76B"
                        : status.percentage < 66.66
                        ? primaryColor
                        : "#FC0000"
                    }
                    style={styles.cardIco}
                  />
                  <Text>
                    Porciento de exposición {status.percentage.toFixed(2)}%
                  </Text>
                </View>
                <View style={[styles.flexAndCenter, styles.info]}>
                  <AntDesign
                    name="Safety"
                    size={24}
                    color="#87C76B"
                    style={styles.cardIco}
                  />
                  <Text>{activeDays} días activo</Text>
                </View>
                <View style={[styles.flexAndCenter, styles.info]}>
                  <MaterialIcons
                    name="update"
                    size={24}
                    color="#FA9748"
                    style={styles.cardIco}
                  />
                  <Text>Actualizado {`${date} ${time}`}</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Icon
              raised
              name="heartbeat"
              type="font-awesome"
              color={primaryColor}
              onPress={() =>
                navigation.navigate("HealthStatus", {
                  screen: "MyReports",
                })
              }
              containerStyle={styles.footerLateralIcons}
            />
            <View style={styles.footerCenterIcon}>
              <Icon
                raised
                name="envelope"
                type="font-awesome"
                color={primaryColor}
                onPress={() => navigation.navigate("Notifications")}
                size={30}
              />
              {notificationsBagde > 0 ? (
                <Badge
                  badgeStyle={styles.badgeStyle}
                  containerStyle={[
                    styles.badgeContainerStyle,
                    { right: notificationsBagde > 9 ? -10 : 0 },
                  ]}
                  value={notificationsBagde > 99 ? "99+" : notificationsBagde}
                />
              ) : null}
            </View>
            <Icon
              raised
              name="map-marker"
              type="font-awesome"
              color={primaryColor}
              onPress={() => navigation.navigate("Visits")}
              containerStyle={styles.footerLateralIcons}
            />
          </View>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: primaryColor,
    height: "7%",
    paddingHorizontal: 50,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  footerCenterIcon: {
    bottom: "7%",
  },
  footerLateralIcons: {
    bottom: "3.5%",
  },
  badgeStyle: {
    backgroundColor: primaryColor,
  },
  badgeContainerStyle: {
    position: "absolute",
    top: 0,
  },
  view: {
    backgroundColor: primaryColor,
    height: "25%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  dateHeaderStyle: {
    fontSize: 15,
    color: "white",
    marginLeft: 15,
    marginTop: 25,
  },
  dateWelcomeStyle: {
    fontSize: 20,
    color: "white",
    marginLeft: 15,
  },
  card: {
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
    borderRadius: 10,
    height: Dimensions.get("window").height / 3,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  symptons: {
    marginBottom: 10,
    textAlign: "justify",
  },
  reportSymtons: {
    borderRadius: 20,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: "#FC0000",
  },
  riskCard: {
    marginTop: 15,
    width: Dimensions.get("window").width - 30,
    height: Dimensions.get("window").height / 2.7,
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    borderRadius: 15,
  },
  info: {
    marginLeft: 35,
    marginTop: 20,
  },
  icon: {
    fontSize: 50,
    padding: 10,
  },
  flexAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIco: {
    marginRight: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Home;

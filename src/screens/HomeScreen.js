import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Card, Button } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppHeader from "../components/AppHeader";
import { primaryColor } from "../utils/Colors";
import Loading from "../components/Loading";
import useJwt from "../hooks/useJwt";

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

const Home = () => {
  const [state, setState] = useState(false);
  const [date, setDate] = useState("");
  const [subject, name, authorities] = useJwt();

  useEffect(() => {
    var auxDate = new Date();
    var dateToCopy = `${monthNames[auxDate.getMonth()]}, ${auxDate.getDate()}`;

    setDate(dateToCopy);
    setState(true);
  }, []);

  function bootstrap() {
    return (
      <View style={styles.view}>
        <View>
          <Text
            style={{
              fontSize: 15,
              color: "white",
              marginLeft: 15,
              marginTop: 25,
            }}
          >
            {date}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              marginLeft: 15,
            }}
          >
            Bienvenido {name}
          </Text>
        </View>
        <Card
          title="¿Sientes estos sintomas? "
          containerStyle={[{ borderRadius: 15 }, styles.shadow]}
        >
          <Text style={{ marginBottom: 10, textAlign: "center" }}>
            Fiebre o escalofríos, tos, dificultad para respirar, fatiga, dolores
            musculares, dolor de cabeza, pérdida del olfato o el gusto, dolor de
            garganta, moqueo
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Button
              icon={<MaterialIcons name="report" size={24} color="red" />}
              buttonStyle={{
                borderRadius: 10,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                backgroundColor: "#F7B62A",
              }}
              title="  Reportar sintomas"
            />
          </TouchableOpacity>
        </Card>
        <View
          style={[
            {
              marginTop: 15,
              width: Dimensions.get("window").width - 30,
              height: Dimensions.get("window").height / 2.7,
              backgroundColor: "#FFFFFF",
              alignSelf: "center",
              borderRadius: 15,
            },
            styles.shadow,
          ]}
        >
          <View
            style={[
              styles.flexAndCenter,
              {
                justifyContent: "space-between",
              },
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
              Riesgo Bajo
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <AntDesign
                name="arrowright"
                size={35}
                color="black"
                style={{ marginRight: 35, marginTop: 30 }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.flexAndCenter, { marginLeft: 35, marginTop: 20 }]}
          >
            <MaterialCommunityIcons
              name="bacteria"
              size={24}
              color="#FC0000"
              style={styles.cardIco}
            />
            <Text>Sin exposición hasta ahora</Text>
          </View>
          <View
            style={[styles.flexAndCenter, { marginLeft: 35, marginTop: 20 }]}
          >
            <AntDesign
              name="Safety"
              size={24}
              color="#87C76B"
              style={styles.cardIco}
            />
            <Text>10 de 10 días activo</Text>
          </View>
          <View
            style={[styles.flexAndCenter, { marginLeft: 35, marginTop: 20 }]}
          >
            <MaterialIcons
              name="update"
              size={24}
              color="#FA9748"
              style={styles.cardIco}
            />
            <Text>Actualizado hoy, 12:35 AM</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <>
      <AppHeader title="Inicio" />
      {state ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {bootstrap()}
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: primaryColor,
    height: "25%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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

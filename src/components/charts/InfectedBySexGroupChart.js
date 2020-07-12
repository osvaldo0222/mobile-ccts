import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { PieChart } from "react-native-svg-charts";
import { Feather } from "@expo/vector-icons";
import Loading from "../Loading";
import AppHeader from "../AppHeader";
import { primaryColor, secondaryColor } from "../../utils/Colors";

const InfectedBySexGroupChart = (props) => {
  const [state, setState] = useState(false);
  let auxRoute = props.route.name;
  useEffect(() => {
    setState(true);
  }, []);
  const data = [
    {
      key: 1,
      value: 60.4,
      svg: { fill: "#62B5F6" },
    },
    {
      key: 2,
      value: 39.6,
      svg: { fill: "#F7A6DD" },
    },
  ];

  function bootstrapChart() {
    return (
      <>
        <Text
          style={{
            margin: 12,
            fontSize: 20,
            color: "#000000",
            fontWeight: "500",
          }}
        >
          Porcentaje confirmado segun sexo{" "}
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: Dimensions.get("window").width - 20,
            alignItems: "center",
            borderRadius: 15,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        >
          <PieChart
            style={{
              height:
                Dimensions.get("window").height -
                Dimensions.get("window").height / 1.7,
              width:
                Dimensions.get("window").width -
                Dimensions.get("window").width / 3,
            }}
            data={data}
            innerRadius="88%"
          />
          <View style={styles.generalInfoView}>
            <Text style={{ fontSize: 18, marginLeft: 10 }}>
              <Feather name="circle" size={18} color="#62B5F6" />
              Masculino
            </Text>
            <Text style={{ fontSize: 18, marginLeft: 10 }}>
              <Feather name="circle" size={18} color="#F7A6DD" />
              Femenino
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardText}>{data[0].value}%</Text>
            <Text style={styles.subCardText}>
              Edad Promedio
              <Text style={{ color: "green" }}> 50 - 65</Text>
            </Text>
          </View>
          <View>
            <FontAwesome name="male" style={styles.icon} color="#339FF4" />
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardBody}>
            <Text style={styles.cardText}>{data[1].value}%</Text>
            <Text style={styles.subCardText}>
              Edad Promedio
              <Text style={{ color: "green" }}> 40 - 55</Text>
            </Text>
          </View>
          <View>
            <FontAwesome name="female" style={styles.icon} color="#F7A6DD" />
          </View>
        </View>
      </>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.view}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader title={auxRoute} />
      {state ? bootstrapChart() : <Loading />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 5,
    height: Dimensions.get("window").height,
  },
  generalInfoView: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  fromTo: {
    color: "gray",
    marginLeft: 10,
  },
  card: {
    alignSelf: "stretch",
    marginTop: 10,
    marginHorizontal: 10,
    padding: 5,
    borderRadius: 10,
    height: "15%",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardBody: {
    margin: 10,
  },
  cardText: {
    fontSize: 30,
  },
  icon: {
    fontSize: 30,
    paddingRight: 20,
  },
  subCardText: {
    fontSize: 12,
    color: "gray",
  },
  infectedPercentage: {
    flexDirection: "row",
    alignItems: "center",
  },
  infectedPercentageText: {
    fontSize: 24,
    color: "#F14D4D",
    marginLeft: 15,
  },
});

export default InfectedBySexGroupChart;

import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { PieChart } from "react-native-svg-charts";
import Loading from "../components/Loading";
import AppHeader from "../components/AppHeader";
import { Context as StatisticsContext } from "../context/StatisticsContext";
import { primaryColor } from "../utils/Colors";
import CardComponent from "../components/charts/Card";

const InfectedRecoveredScreen = () => {
  const {
    state: { infected, recovered },
    fetchInfected,
    fetchRecovered,
  } = useContext(StatisticsContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchApi = useCallback(async () => {
    if (!infected.data.length) {
      await fetchInfected();
    }
    if (!recovered.data.length) {
      await fetchRecovered();
    }
  }, [infected, recovered]);

  useEffect(() => {
    if (loading) {
      fetchApi();
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    if (infected.data.length && recovered.data.length) {
      setData([
        {
          key: 1,
          value: parseFloat(
            ((1 - recovered.total / infected.total) * 100).toFixed(2)
          ),
          svg: { fill: "#FC0000" },
        },
        {
          key: 2,
          value: parseFloat(
            ((recovered.total / infected.total) * 100).toFixed(2)
          ),
          svg: { fill: primaryColor },
        },
      ]);
    }
  }, [infected, recovered]);

  return (
    <>
      <AppHeader title="Casos Activos" />
      {loading || data.length === 0 ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setLoading(true);
              }}
            />
          }
        >
          <View style={styles.view}>
            <Text style={styles.title}>Casos Activos Vs. Recuperados</Text>
            <View style={styles.chartView}>
              <PieChart style={styles.pieChart} data={data} innerRadius="88%" />
              <View style={styles.generalInfoView}>
                <Text style={styles.lengend}>
                  <Feather name="circle" size={18} color="#FC0000" />
                  {`  Activos`}
                </Text>
                <Text style={styles.lengend}>
                  <Feather name="circle" size={18} color={primaryColor} />
                  {`  Recuperados`}
                </Text>
              </View>
            </View>
            <CardComponent
              colorIcon="#FC0000"
              iconName="allergies"
              subject="Casos activos:"
              total={`${data[0].value}%`}
              newest={` ${infected.total - recovered.total}`}
              marginBottom={2}
              subjectIcon={null}
            />
            <CardComponent
              colorIcon={primaryColor}
              iconName="running"
              subject="Casos recuperados:"
              total={`${data[1].value}%`}
              newest={` ${recovered.total}`}
              marginBottom={2}
              subjectIcon={null}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 5,
    flex: 1,
  },
  title: {
    margin: 12,
    fontSize: 20,
    color: primaryColor,
    fontWeight: "500",
  },
  pieChart: {
    height:
      Dimensions.get("window").height - Dimensions.get("window").height / 1.7,
    width: Dimensions.get("window").width - Dimensions.get("window").width / 3,
  },
  lengend: {
    fontSize: 18,
    marginLeft: 10,
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
  chartView: {
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
  },
});

export default InfectedRecoveredScreen;

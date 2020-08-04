import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  RefreshControl,
} from "react-native";
import { PieChart } from "react-native-svg-charts";
import Loading from "../components/Loading";
import AppHeader from "../components/AppHeader";
import { Context as StatisticsContext } from "../context/StatisticsContext";
import { primaryColor } from "../utils/Colors";
import CardComponent from "../components/charts/Card";

const InfectedRecoveredScreen = () => {
  const {
    state: { infected, recovered, deaths },
    fetchInfected,
    fetchRecovered,
    fetchDeaths,
    clearStatisticsContext,
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
    if (!deaths.data.length) {
      await fetchDeaths();
    }
  }, [infected, recovered, deaths]);

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
            (
              ((infected.total - recovered.total - deaths.total) /
                infected.total) *
              100
            ).toFixed(2)
          ),
          svg: { fill: "#FA9748" },
        },
        {
          key: 2,
          value: parseFloat(
            ((recovered.total / infected.total) * 100).toFixed(2)
          ),
          svg: { fill: primaryColor },
        },
        {
          key: 3,
          value: parseFloat(((deaths.total / infected.total) * 100).toFixed(2)),
          svg: { fill: "#FC0000" },
        },
      ]);
    }
  }, [infected, recovered, deaths]);

  return (
    <>
      <AppHeader title="Casos Activos" />
      {loading || data.length === 0 ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 50 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                clearStatisticsContext();
                setLoading(true);
              }}
            />
          }
        >
          <View style={styles.view}>
            <Text style={styles.title}>Resultado de infectados</Text>
            <View style={styles.chartView}>
              <PieChart style={styles.pieChart} data={data} innerRadius="88%" />
            </View>
            <CardComponent
              colorIcon="#FA9748"
              iconName="allergies"
              subject="Casos activos:"
              subjectColor="#FA9748"
              total={`${data[0].value}%`}
              newest={` ${infected.total - recovered.total - deaths.total}`}
              marginBottom={2}
              subjectIcon={null}
            />
            <CardComponent
              colorIcon={primaryColor}
              iconName="running"
              subject="Casos recuperados:"
              subjectColor={primaryColor}
              total={`${data[1].value}%`}
              newest={` ${recovered.total}`}
              marginBottom={2}
              subjectIcon={null}
            />
            <CardComponent
              colorIcon="#FC0000"
              iconName="sad-tear"
              subject="Casos defunciones:"
              subjectColor="#FC0000"
              total={`${data[2].value}%`}
              newest={` ${deaths.total}`}
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

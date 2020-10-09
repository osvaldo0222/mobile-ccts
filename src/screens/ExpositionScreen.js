import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text, FlatList, Dimensions, ScrollView, RefreshControl } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { Context as ExpositionContext } from "../context/ExpositionContext";
import AppHeader from "../components/AppHeader";
import ExpositionListComponent from "../components/ExpositionListComponent";
import { captionColor, primaryColor, secondaryColor } from "../utils/Colors";
import Loading from "../components/Loading";

const ExpositionScreen = () => {
  const {
    state: { exposition },
    fetchExposition,
  } = useContext(ExpositionContext);
  const [visits, setVisits] = useState([]);
  const [data, setData] = useState([0, 0, 0, 0, 0]);
  const [labels, setLabels] = useState([1, 2, 3, 4, 5]);
  const [refreshing, setRefreshing] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (refreshing) {
      fetchExposition(page);
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    if (exposition.length > 0) {
      let temp = [];
      let tempData = [];
      let tempLabels = [];

      if (exposition.length < 5) {
        let numberToFill = 5 - exposition.length;
        for (let i = 0; i < numberToFill; i++) {
          tempData.push(0);
          tempLabels.push(i + 1);
        }
      }

      exposition.forEach(element => {
        element.visit.forEach(visit => {
          if (!temp.find(x => x.id === visit.id)) {
            temp.push(visit);
          }
        });
        tempData = [...tempData, element.probabilityOfInfection];
        tempLabels = [...tempLabels, tempLabels.length + 1];
      });

      setVisits(temp);
      setData(tempData);
      setLabels(tempLabels);
    }
  }, [exposition]);

  return (
    <>
      <AppHeader title="Exposición" />
      {data.length > 0 && labels.length > 0 ? (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => {
              setRefreshing(true);
              setPage(0);
            }} />
          }
        >
          <View style={{ alignItems: "center", marginBottom: 10, }}>
            <Text style={styles.screenTitle}>Variación del % Exposición</Text>
            <LineChart
              data={{
                labels: labels,
                datasets: [
                  {
                    data: data
                  }
                ]
              }}
              width={Dimensions.get("window").width} // from react-native
              height={Dimensions.get("window").height / 2.5}
              yAxisLabel=""
              yAxisSuffix="%"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 0.3) => `rgba(61, 109, 204, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(178, 178, 178, ${opacity})`,
                style: {},
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: primaryColor,
                },
              }}
              style={styles.chart}
              bezier={false}
              withInnerLines={false}
            />
          </View>
          <FlatList
            data={visits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ExpositionListComponent item={item} />}
            onEndReached={() => {
              if (exposition.length >= 25) {
                setRefreshing(true);
                setPage((current) => current + 1);
              }
            }}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    backgroundColor: secondaryColor,
                    flexDirection: "row",
                    padding: 10,
                    paddingTop: 15,
                  }}
                >
                  <MaterialCommunityIcons
                    name="account-group"
                    size={18}
                    color={captionColor}
                    style={{ padding: 3 }}
                  />
                  <Text style={{ fontSize: 18, paddingLeft: 15 }}>Coincidencias con Infectados</Text>
                </View>
              );
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  {!refreshing ? <Text>Sin exposición por el momento</Text> : null}
                </View>
              );
            }}
          />
        </ScrollView>
      ) : <Loading />}
    </>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    padding: 10,
    fontSize: 20,
    color: primaryColor,
    fontWeight: "500",
  },
  scrollContainer: {
    paddingTop: 10,
  },
  chart: {
    marginTop: 10,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});

export default ExpositionScreen;

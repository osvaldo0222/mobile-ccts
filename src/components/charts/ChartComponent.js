import React, { useContext, useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../Loading";
import { primaryColor, captionColor } from "../../utils/Colors";
import CardComponent from "./Card";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 0.3) => `rgba(61, 109, 204, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(178, 178, 178, ${opacity})`,
  style: {},
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: primaryColor,
  },
};

//From https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
function hexToRgbA(hex, opacity) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      opacity +
      ")"
    );
  }
  throw new Error("Bad Hex");
}

const ChartComponent = ({
  values,
  fetchFunction,
  subject,
  iconName,
  colorIcon,
}) => {
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(10);

  const fetchApi = useCallback(async () => {
    await fetchFunction(days);
  }, [days]);

  useEffect(() => {
    if (loading) {
      fetchApi();
      setLoading(false);
    }
  }, [loading]);

  const buttonActive = (buttonNumber) => {
    if (days === buttonNumber) {
      return primaryColor;
    } else {
      return captionColor;
    }
  };

  const changeDay = (days) => {
    setDays(days);
    setLoading(true);
  };

  return (
    <>
      {loading || values.data.length === 0 ? (
        <Loading />
      ) : (
        <ScrollView
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
            <Text style={styles.screenTitle}>Consultar últimos datos</Text>
            <View style={styles.generalInfoView}>
              <Text style={styles.fromTo}>Desde: </Text>
              <Text>{values.dates[0]}</Text>
              <Text style={styles.fromTo}>Hasta: </Text>
              <Text>{values.dates[values.dates.length - 1]}</Text>
            </View>
            <View style={styles.shadow}>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    changeDay(10);
                  }}
                >
                  <Text style={{ color: buttonActive(10) }}> 10 días</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    changeDay(20);
                  }}
                >
                  <Text style={{ color: buttonActive(20) }}> 20 días</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    changeDay(30);
                  }}
                >
                  <Text style={{ color: buttonActive(30) }}>30 días</Text>
                </TouchableOpacity>
              </View>
              <LineChart
                data={{
                  labels: values.labels,
                  datasets: [
                    {
                      data: values.data,
                      strokeWidth: 5,
                    },
                  ],
                }}
                width={Dimensions.get("window").width - 20} // from react-native
                height={Dimensions.get("window").height / 2}
                yAxisInterval={2000} // optional, defaults to 1
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 0.3) => hexToRgbA(colorIcon, opacity),
                  labelColor: (opacity = 1) =>
                    `rgba(178, 178, 178, ${opacity})`,
                  propsForDots: {
                    r: "4",
                    strokeWidth: "2",
                    stroke: colorIcon,
                  },
                }}
                style={styles.chart}
                withInnerLines={false}
                bezier={false}
              />
            </View>
            <CardComponent
              newest={values.newCases}
              total={values.total}
              subject={subject}
              subjectColor={colorIcon}
              colorIcon={colorIcon}
              iconName={iconName}
              marginBottom={20}
              subjectIcon={
                <AntDesign name="plus" size={12} color={colorIcon} />
              }
            />
          </View>
        </ScrollView>
      )}
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
  title: {
    fontSize: 30,
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 9,
  },
  card: {
    alignSelf: "stretch",
    margin: 10,
    padding: 5,
    borderRadius: 10,
    height: "15%",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
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
  generalInfoView: {
    flexDirection: "row",
    marginBottom: 10,
  },
  fromTo: {
    color: "gray",
    marginLeft: 10,
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
  subCardText: {
    fontSize: 12,
    color: "gray",
  },
  button: {
    alignItems: "center",
    padding: 10,
  },
  buttonGroup: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-around",
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
  chart: {
    marginTop: 10,
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

export default ChartComponent;

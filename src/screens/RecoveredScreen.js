import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context as StatisticsContext } from "../context/StatisticsContext";
import ChartComponent from "../components/charts/ChartComponent";
import AppHeader from "../components/AppHeader";

const RecoveredScreen = () => {
  const {
    state: { recovered },
    fetchRecovered,
  } = useContext(StatisticsContext);
  return (
    <>
      <AppHeader title="Recuperados" />
      <ChartComponent
        values={recovered}
        fetchFunction={fetchRecovered}
        iconName="running"
        subject="Recuperados Recientemente"
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default RecoveredScreen;

import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context as StatisticsContext } from "../context/StatisticsContext";
import ChartComponent from "../components/charts/ChartComponent";
import AppHeader from "../components/AppHeader";

const InfectedScreen = () => {
  const {
    state: { infected },
    fetchInfected,
  } = useContext(StatisticsContext);
  return (
    <>
      <AppHeader title="Infectados" />
      <ChartComponent
        values={infected}
        fetchFunction={fetchInfected}
        iconName="allergies"
        subject="Casos nuevos"
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default InfectedScreen;

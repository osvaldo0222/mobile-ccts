import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context as StatisticsContext } from "../context/StatisticsContext";
import ChartComponent from "../components/charts/ChartComponent";
import AppHeader from "../components/AppHeader";

const DeathScreen = () => {
  const {
    state: { deaths },
    fetchDeaths,
  } = useContext(StatisticsContext);
  return (
    <>
      <AppHeader title="Defunciones" />
      <ChartComponent
        values={deaths}
        fetchFunction={fetchDeaths}
        iconName="sad-tear"
        subject="Nuevas defunciones"
        colorIcon="#FC0000"
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default DeathScreen;

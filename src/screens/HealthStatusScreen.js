import React, { useContext, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-elements";
import { Context as HealthStatusContext } from "../context/HealthStatusContext";
import AppHeader from "../components/AppHeader";
import HealthStatusListComponent from "../components/HealthStatusListComponent";
import { NavigationContext } from "@react-navigation/native";

const HealthStatusScreen = () => {
  const {
    state: { healthStatus, newData },
    fetchHealthStatus,
    clearHealthStatusError,
  } = useContext(HealthStatusContext);
  const navigation = useContext(NavigationContext);
  const [page, setPage] = useState(0);
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    if (refreshing) {
      fetchHealthStatus(page);
      setRefreshing(false);
    }
  }, [refreshing]);

  useEffect(() => {
    if (newData) {
      setRefreshing(true);
      setPage(0);
    }
  }, [newData]);

  useEffect(() => {
    const blurNavListener = navigation.addListener("focus", () =>
      clearHealthStatusError()
    );

    return blurNavListener;
  }, [navigation]);

  return (
    <>
      <AppHeader title="Mis Reportes" />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={healthStatus}
        renderItem={({ item }) => <HealthStatusListComponent item={item} />}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setPage(0);
        }}
        onEndReached={() => {
          if (healthStatus.length >= 25) {
            setRefreshing(true);
            setPage((current) => current + 1);
          }
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
              {!refreshing ? (
                <Text>No tiene ningun reporte por el momento</Text>
              ) : null}
            </View>
          );
        }}
      />
    </>
  );
};

export default HealthStatusScreen;

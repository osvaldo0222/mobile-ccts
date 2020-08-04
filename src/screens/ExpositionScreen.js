import React, { useEffect, useState, useContext, useCallback } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Context as ExpositionContext } from "../context/ExpositionContext";
import AppHeader from "../components/AppHeader";
import ExpositionListComponent from "../components/ExpositionListComponent";

const ExpositionScreen = () => {
  const {
    state: { exposition },
    fetchExposition,
  } = useContext(ExpositionContext);
  const [refreshing, setRefreshing] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (refreshing) {
      fetchExposition(page);
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <>
      <AppHeader title="Exposición" />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={exposition}
        renderItem={({ item }) => <ExpositionListComponent item={item} />}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setPage(0);
        }}
        onEndReached={() => {
          if (exposition.length >= 25) {
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
              {!refreshing ? <Text>Sin exposición por el momento</Text> : null}
            </View>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default ExpositionScreen;

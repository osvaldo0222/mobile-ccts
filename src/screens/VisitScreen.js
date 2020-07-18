import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Divider, Text } from "react-native-elements";
import VisitListComponent from "../components/VisitListComponent";
import AppHeader from "../components/AppHeader";
import SearchBar from "../components/SearchBar";
import { Context as VisitContext } from "../context/VisitContext";

const VisitScreen = () => {
  const {
    state: { visits },
    fetchVisits,
    clearVisitContext,
  } = useContext(VisitContext);
  const [refreshing, setRefreshing] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [timeRef, setTimeRef] = useState(null);

  const refresh = useCallback(async () => {
    await fetchVisits(page, search);
    setRefreshing(false);
    setTimeRef(null);
  }, [search]);

  useEffect(() => {
    if (refreshing) {
      if (timeRef) {
        clearTimeout(timeRef);
      }
      let id = setTimeout(refresh, 1000);
      setTimeRef(id);
    }
  }, [refreshing, refresh]);

  const onSearchTextChange = (newText) => {
    clearVisitContext();
    setSearch(newText);
    setRefreshing(true);
    setPage(0);
  };

  return (
    <>
      <AppHeader title="Visitas" />
      <View style={{ backgroundColor: "#fff" }}>
        <SearchBar
          term={search}
          onTermChange={onSearchTextChange}
          onTermSubmit={() => console.log("Search complete")}
          placeholder="Buscar por nombre de localidad"
        />
      </View>
      <Divider />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={visits}
        renderItem={({ item }) => {
          return <VisitListComponent item={item} />;
        }}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);

          setPage(0);
        }}
        onEndReached={() => {
          if (visits.length >= 25) {
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
                <Text>
                  {search
                    ? `No hay ninguna visita a ${search}`
                    : "No ha realizado ninguna visita"}
                </Text>
              ) : null}
            </View>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default VisitScreen;

import React, { useEffect, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import LogoTemplate from "../components/LogoTemplate";

const SplashScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(tryLocalSignin, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <LogoTemplate />
      <ActivityIndicator size="large" color="#0000ff" />
      <Text h3 style={styles.text}>
        CCTS
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    position: "absolute",
    bottom: 10,
    color: "#ADADAD",
  },
});

export default SplashScreen;

import React, { useContext } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Button, Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import LogoTemplate from "../components/LogoTemplate";

const SignInScreen = () => {
  const {
    state: { errorMessage },
    signin,
    clearErrorMessage,
  } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <LogoTemplate />
        </View>
        <View style={styles.body}>
          <AuthForm
            signInCallback={signin}
            errorMessage={errorMessage}
            clearErrorMessage={clearErrorMessage}
          />
        </View>
        <View style={styles.footer}>
          <Divider />
          <Button
            containerStyle={styles.footerButton}
            titleStyle={{ fontSize: 14 }}
            title="¿No tienes una cuenta? Regístrate"
            onPress={() => {
              setLoading(true);
              signInCallback({ username, password });
            }}
            S
            type="clear"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 3,
  },
  footer: {
    flex: 0.05,
  },
  footerButton: {
    marginTop: 2,
  },
});

export default SignInScreen;

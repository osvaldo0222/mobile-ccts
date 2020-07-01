import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Divider } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import LogoTemplate from "../components/LogoTemplate";
import ScrollSafeArea from "../components/ScrollSafeArea";

const SignInScreen = ({ navigation }) => {
  const {
    state: {
      errorMessages: { login },
    },
    signin,
    clearErrorMessages,
  } = useContext(AuthContext);

  useEffect(() => {
    const blurNavListener = navigation.addListener("focus", () =>
      clearErrorMessages()
    );

    return blurNavListener;
  }, [navigation]);

  return (
    <ScrollSafeArea>
      <View style={styles.header}>
        <LogoTemplate />
      </View>
      <View style={styles.body}>
        <AuthForm
          signInCallback={signin}
          errorMessage={login}
          clearErrorMessage={clearErrorMessages}
        />
      </View>
      <View style={styles.footer}>
        <Divider />
        <Button
          containerStyle={styles.footerButton}
          titleStyle={{ fontSize: 14 }}
          title="¿No tienes una cuenta? Regístrate"
          onPress={() => navigation.navigate("SignUp")}
          type="clear"
        />
      </View>
    </ScrollSafeArea>
  );
};

const styles = StyleSheet.create({
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

import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { primaryColor, borderLineColor } from "../utils/Colors";
import AuthForm from "../components/AuthForm";
import LogoTemplate from "../components/LogoTemplate";
import ScrollSafeArea from "../components/ScrollSafeArea";

const SignInScreen = ({ navigation }) => {
  const { clearErrorMessages } = useContext(AuthContext);

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
        <AuthForm />
        <Button
          containerStyle={styles.forgetPassword}
          titleStyle={styles.button}
          title="¿Olvidaste tus credenciales? Restablecer"
          type="clear"
        />
      </View>
      <View style={styles.footer}>
        <Button
          containerStyle={styles.footerButton}
          titleStyle={styles.button}
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
    borderTopColor: borderLineColor,
    borderTopWidth: 1,
    flex: 0.05,
  },
  footerButton: {
    marginTop: 2,
  },
  forgetPassword: {
    marginTop: 10,
  },
  button: {
    fontSize: 14,
    color: primaryColor,
  },
});

export default SignInScreen;

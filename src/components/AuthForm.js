import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PasswordInput from "./PasswordInput";

const AuthForm = ({ signInCallback, clearErrorMessage, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      Alert.alert(
        "Error",
        errorMessage,
        [
          {
            text: "Intentar de nuevo",
            onPress: () => setPassword(""),
          },
        ],
        { cancelable: false }
      );
      setLoading(false);
      clearErrorMessage();
    }
  }, [errorMessage]);

  return (
    <>
      <Input
        value={username}
        onChangeText={setUsername}
        label="Usuario o correo electrónico"
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon={<Icon name="account" size={24} color="#ADADAD" />}
      />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        label="Contraseña"
      />
      <Button
        title="  Iniciar Sesión"
        icon={
          <Icon
            name="account-arrow-right"
            size={24}
            color={username.length && password.length ? "#1E91D6" : "#ADADAD"}
          />
        }
        onPress={() => {
          setLoading(true);
          signInCallback({ username, password });
        }}
        type="outline"
        loading={loading}
        disabled={username.length && password.length ? false : true}
      />
      <Button
        containerStyle={styles.forgetPassword}
        titleStyle={{ fontSize: 14 }}
        title="¿Olvidaste tus credenciales? Restablecer"
        type="clear"
      />
    </>
  );
};

const styles = StyleSheet.create({
  forgetPassword: {
    marginTop: 10,
  },
});

export default AuthForm;

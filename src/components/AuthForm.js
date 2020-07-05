import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PasswordInput from "./PasswordInput";
import { Context as AuthContext } from "../context/AuthContext";
import { captionColor, primaryColor } from "../utils/Colors";

const AuthForm = () => {
  const {
    state: {
      errorMessages: { login },
      notificationToken,
    },
    signin,
    clearErrorMessages,
  } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (login) {
      Alert.alert(
        "Error",
        login,
        [
          {
            text: "Intentar de nuevo",
            onPress: () => setPassword(""),
          },
        ],
        { cancelable: false }
      );
      setLoading(false);
      clearErrorMessages();
    }
  }, [login]);

  return (
    <>
      <Input
        value={username}
        onChangeText={setUsername}
        label="Usuario o correo electrónico"
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon={<Icon name="account" size={24} color={captionColor} />}
      />
      <PasswordInput value={password} onChangeText={setPassword} />
      <Button
        title="  Iniciar Sesión"
        icon={
          <Icon
            name="account-arrow-right"
            size={24}
            color={
              username.length && password.length ? primaryColor : captionColor
            }
          />
        }
        onPress={() => {
          setLoading(true);
          signin({ username, password, notificationToken });
        }}
        type="outline"
        loading={loading}
        disabled={username.length && password.length ? false : true}
        titleStyle={{ color: primaryColor }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default AuthForm;

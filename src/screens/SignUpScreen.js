import React, { useContext, useState, useEffect, useCallback } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContext } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext } from "../context/AuthContext";
import LogoTemplate from "../components/LogoTemplate";
import PasswordInput from "../components/PasswordInput";

const SignUpScreen = () => {
  const navigation = useContext(NavigationContext);
  const {
    state: { errorMessages },
    signup,
    confirmEmail,
    confirmId,
    confirmUsername,
    clearErrorMessages,
  } = useContext(AuthContext);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validation =
    id.length === 13 &&
    email.length &&
    username.length &&
    password.length &&
    !errorMessages.id &&
    !errorMessages.email &&
    !errorMessages.username;

  useEffect(() => {
    if (errorMessages.id || errorMessages.username || errorMessages.email) {
      setLoading(false);
    }

    const blurNavListener = navigation.addListener("focus", () =>
      clearErrorMessages()
    );

    return blurNavListener;
  }, [errorMessages, navigation]);

  const handleIdChange = (text) => {
    if (
      text
        .replace("-", "")
        .replace("-", "")
        .match(/^[0-9]+$/) ||
      text === ""
    ) {
      setId((current) =>
        (text.length === 3 || text.length === 11) &&
        (current.length === 2 || current.length === 10)
          ? text + "-"
          : text
      );
    }
  };

  const validate = () => {
    if (id.length >= 13) {
      confirmId({ id });
    }

    if (email.length > 0) {
      confirmEmail({ email });
    }

    if (username.length > 0) {
      confirmUsername({ username });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
        <Icon name="arrow-left" size={30} color="#ADADAD" />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <LogoTemplate />
        </View>
        <View style={styles.body}>
          <Input
            value={id}
            onChangeText={handleIdChange}
            label="Cédula de identidad"
            leftIcon={<Icon name="card-bulleted" size={24} color="#ADADAD" />}
            rightIcon={
              errorMessages.id ? (
                <Icon name="close-circle" size={24} color="red" />
              ) : null
            }
            keyboardType="numeric"
            maxLength={13}
            errorMessage={errorMessages.id}
            onBlur={() => validate()}
          />
          <Input
            value={email}
            onChangeText={setEmail}
            label="Correo electrónico"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Icon name="email" size={24} color="#ADADAD" />}
            rightIcon={
              errorMessages.email ? (
                <Icon name="close-circle" size={24} color="red" />
              ) : null
            }
            keyboardType="email-address"
            errorMessage={errorMessages.email}
            onBlur={() => validate()}
          />
          <Input
            value={username}
            onChangeText={setUsername}
            label="Usuario"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Icon name="account" size={24} color="#ADADAD" />}
            rightIcon={
              errorMessages.username ? (
                <Icon name="close-circle" size={24} color="red" />
              ) : null
            }
            errorMessage={errorMessages.username}
            onBlur={() => validate()}
          />
          <PasswordInput
            label="Contraseña"
            password={password}
            setPassword={setPassword}
          />
        </View>
      </ScrollView>
      <Button
        title="  Regístrate"
        type="outline"
        icon={
          <Icon
            name="account-plus"
            size={24}
            color={validation ? "#1E91D6" : "#ADADAD"}
          />
        }
        containerStyle={styles.button}
        disabled={validation ? false : true}
        loading={loading}
        onPress={() => {
          setLoading(true);
          signup({ id, email, username, password });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
  header: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 3,
    justifyContent: "center",
    marginTop: 30,
  },
  back: {
    alignSelf: "flex-start",
    paddingBottom: 5,
  },
  button: {
    paddingVertical: 10,
  },
});

export default SignUpScreen;

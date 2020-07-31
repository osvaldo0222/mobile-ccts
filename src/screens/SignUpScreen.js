import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContext } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Context as AuthContext } from "../context/AuthContext";
import { primaryColor, secondaryColor, captionColor } from "../utils/Colors";
import LogoTemplate from "../components/LogoTemplate";
import PasswordInput from "../components/PasswordInput";

const SignUpScreen = () => {
  const navigation = useContext(NavigationContext);
  const {
    state: {
      errorMessages: {
        id: idError,
        email: emailError,
        username: usernameError,
      },
      notificationToken,
    },
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
    !idError &&
    !emailError &&
    !usernameError;

  useEffect(() => {
    if (idError || emailError || usernameError) {
      setLoading(false);
    }

    const blurNavListener = navigation.addListener("focus", () =>
      clearErrorMessages()
    );

    return blurNavListener;
  }, [idError, emailError, usernameError, navigation]);

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

  const handleUsernameChange = (text) => {
    setUsername((current) => (text.match(/^[a-zA-Z0-9]*$/) ? text : current));
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
        <Icon name="arrow-left" size={30} color={captionColor} />
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
            leftIcon={
              <Icon name="card-bulleted" size={24} color={captionColor} />
            }
            rightIcon={
              idError ? (
                <Icon name="close-circle" size={24} color="red" />
              ) : null
            }
            keyboardType="numeric"
            maxLength={13}
            errorMessage={idError}
            onBlur={() => confirmId({ id })}
          />
          <Input
            value={email}
            onChangeText={(text) => setEmail(text.trim())}
            label="Correo electrónico"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Icon name="email" size={24} color={captionColor} />}
            rightIcon={
              emailError ? (
                <Icon name="close-circle" size={24} color="red" />
              ) : null
            }
            keyboardType="email-address"
            errorMessage={emailError}
            onBlur={() => confirmEmail({ email })}
          />
          <Input
            value={username}
            onChangeText={handleUsernameChange}
            label="Usuario"
            autoCapitalize="none"
            autoCorrect={false}
            leftIcon={<Icon name="account" size={24} color="#ADADAD" />}
            rightIcon={
              usernameError ? (
                <Icon name="close-circle" size={24} color="red" />
              ) : null
            }
            errorMessage={usernameError}
            onBlur={() => confirmUsername({ username })}
          />
          <PasswordInput value={password} onChangeText={setPassword} />
        </View>
      </ScrollView>
      <Button
        title="  Regístrate"
        type="outline"
        icon={
          <Icon
            name="account-plus"
            size={24}
            color={validation ? primaryColor : captionColor}
          />
        }
        containerStyle={styles.button}
        disabled={!validation}
        loading={loading}
        onPress={() => {
          setLoading(true);
          signup({ id, email, username, password, notificationToken });
        }}
        titleStyle={{ color: primaryColor }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: secondaryColor,
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

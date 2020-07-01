import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PasswordInput = ({ password, setPassword, label }) => {
  const [secure, setSecure] = useState(true);

  return (
    <Input
      value={password}
      onChangeText={setPassword}
      label={label}
      secureTextEntry={secure}
      autoCapitalize="none"
      autoCorrect={false}
      leftIcon={<Icon name="lock" size={24} color="#ADADAD" />}
      rightIcon={
        <TouchableOpacity onPress={() => setSecure((current) => !current)}>
          <Icon name={secure ? "eye-off" : "eye"} size={24} color="#ADADAD" />
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({});

export default PasswordInput;

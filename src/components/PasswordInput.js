import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { captionColor } from "../utils/Colors";

const PasswordInput = (props) => {
  const [secure, setSecure] = useState(true);

  return (
    <Input
      {...props}
      secureTextEntry={secure}
      rightIcon={
        <TouchableOpacity onPress={() => setSecure((current) => !current)}>
          <Icon
            name={secure ? "eye-off" : "eye"}
            size={24}
            color={captionColor}
          />
        </TouchableOpacity>
      }
    />
  );
};

PasswordInput.defaultProps = {
  leftIcon: <Icon name="lock" size={24} color={captionColor} />,
  autoCapitalize: "none",
  autoCorrect: false,
  label: "Contraseña",
};

const styles = StyleSheet.create({});

export default PasswordInput;

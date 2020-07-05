import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContext } from "@react-navigation/native";
import { secondaryColor, primaryColor } from "../utils/Colors";

const Menu = () => {
  const navigation = useContext(NavigationContext);

  return (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Icon color={secondaryColor} name="menu" size={30} />
    </TouchableOpacity>
  );
};

const AppHeader = ({ title }) => {
  return (
    <>
      <Header
        leftComponent={<Menu />}
        centerComponent={{
          text: title,
          style: { color: secondaryColor, fontSize: 18 },
        }}
        rightComponent={
          <Icon name="bluetooth-off" size={30} color={secondaryColor} />
        }
        backgroundColor={primaryColor}
        statusBarProps={{
          hidden: false,
          barStyle: "light-content",
          backgroundColor: primaryColor,
          translucent: true,
          animated: true,
        }}
        containerStyle={{
          flex: 0.1,
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default AppHeader;

import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Header, Badge } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContext } from "@react-navigation/native";
import useBle from "../hooks/useBle";
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
  const [broadcastState, tryToBroadcast, stopBroadcast] = useBle();

  return (
    <Header
      leftComponent={<Menu />}
      centerComponent={{
        text: title,
        style: { color: secondaryColor, fontSize: 18 },
      }}
      rightComponent={
        <TouchableOpacity
          onPress={broadcastState ? stopBroadcast : tryToBroadcast}
        >
          <Icon
            name={
              broadcastState
                ? "access-point-network"
                : "access-point-network-off"
            }
            size={30}
            color={secondaryColor}
          />

          <Badge
            status={broadcastState ? "success" : "error"}
            containerStyle={{ position: "absolute", top: -4, right: -4 }}
          />
        </TouchableOpacity>
      }
      backgroundColor={primaryColor}
      statusBarProps={{
        hidden: false,
        barStyle: "light-content",
        backgroundColor: primaryColor,
        translucent: true,
        animated: true,
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default AppHeader;

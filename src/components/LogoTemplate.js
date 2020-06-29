import React from "react";
import { Dimensions, Image } from "react-native";

const logoSize = Dimensions.get("screen").height * 0.2;

const LogoTemplate = ({ width, height }) => {
  return (
    <>
      <Image
        style={{ width: width, height: height }}
        source={require("../../assets/logo.png")}
      />
    </>
  );
};

LogoTemplate.defaultProps = {
  width: logoSize,
  height: logoSize,
};

export default LogoTemplate;

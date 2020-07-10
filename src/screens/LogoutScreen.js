import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as BleContext } from "../context/BleContext";
import Loading from "../components/Loading";

const LogoutScreen = () => {
  const {
    state: { notificationToken },
    signout,
  } = useContext(AuthContext);
  const { clearContext } = useContext(BleContext);

  useEffect(() => {
    setTimeout(() => {
      signout({ notificationToken });
      clearContext();
    }, 1000);
  }, []);

  return <Loading />;
};

export default LogoutScreen;

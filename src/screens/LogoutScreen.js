import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as BleContext } from "../context/BleContext";
import { Context as NotificationContext } from "../context/NotificationContext";
import Loading from "../components/Loading";

const LogoutScreen = () => {
  const {
    state: { notificationToken },
    signout,
  } = useContext(AuthContext);
  const { clearBleContext } = useContext(BleContext);
  const { clearNotificationContext } = useContext(NotificationContext);

  useEffect(() => {
    setTimeout(() => {
      signout({ notificationToken });
      clearBleContext();
      clearNotificationContext();
    }, 1000);
  }, []);

  return <Loading />;
};

export default LogoutScreen;

import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as BleContext } from "../context/BleContext";
import { Context as NotificationContext } from "../context/NotificationContext";
import { Context as VisitContext } from "../context/VisitContext";
import { Context as HealthStatusContext } from "../context/HealthStatusContext";
import Loading from "../components/Loading";

const LogoutScreen = () => {
  const {
    state: { notificationToken },
    signout,
  } = useContext(AuthContext);
  const { clearBleContext } = useContext(BleContext);
  const { clearNotificationContext } = useContext(NotificationContext);
  const { clearVisitContext } = useContext(VisitContext);
  const { clearHealthStatusContext } = useContext(HealthStatusContext);

  useEffect(() => {
    setTimeout(() => {
      signout({ notificationToken });
      clearBleContext();
      clearNotificationContext();
      clearVisitContext();
      clearHealthStatusContext();
    }, 1000);
  }, []);

  return <Loading />;
};

export default LogoutScreen;

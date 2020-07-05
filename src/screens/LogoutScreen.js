import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const LogoutScreen = () => {
  const {
    state: { notificationToken },
    signout,
  } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => signout({ notificationToken }), 1000);
  }, []);

  return <Loading />;
};

export default LogoutScreen;

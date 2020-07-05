import React, { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const LocalSignInScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(tryLocalSignin, 1000);
  }, []);

  return <Loading />;
};

export default LocalSignInScreen;

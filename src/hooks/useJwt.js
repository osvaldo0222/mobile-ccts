import React, { useState, useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import JwtDecode from "jwt-decode";

export default () => {
  const {
    state: { token },
  } = useContext(AuthContext);
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [authorities, setAuthorities] = useState([]);
  const [loginDate, setLoginDate] = useState(0);

  useEffect(() => {
    if (token) {
      let body = JwtDecode(token);

      setSubject(body.sub);
      setName(body.name);
      setAuthorities(body.authorities);
      setLoginDate(new Date(body.iat * 1000));
    }
  }, [token]);

  return [subject, name, authorities, loginDate];
};

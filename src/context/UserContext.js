import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import api from "../service/api";
import { Redirect } from "react-router-dom";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState(() => {
    const user = localStorage.getItem("@convergencefood:user");
    if(user) return JSON.parse(user)
    else return {};
  });
  const [login, setLogin] = useState(() => {
    const token = localStorage.getItem("@convergencefood:token");
    return !!token
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("@convergencefood:token");
    if(token) return token;
    else return "";
  });

  async function userLogin(email, password) {
    const loginForm = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const {
        data: { token, user },
      } = await api.post("/api/auth/login", loginForm);
      localStorage.setItem("@convergencefood:token", token);
      localStorage.setItem("@convergencefood:user", JSON.stringify(user));
      setData(user);
      setLogin(true);
      setError("");
      setToken(token);
    } catch (error) {
      const { response } = error;
      if (response) {
        if (response.status === 401) setError("Credenciais Inválidas");
      } else setError("Servidor não responde");
    } finally {
      setLoading(false);
      return <Redirect to="/minhaconta" />
    }
  }
  async function userLogout() {
    try {
      // api.defaults.headers.common = {'Authorization': `Bearer ${token}`}
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await api.post("/api/auth/logout", {}, config);
      setData({});
      console.log("Disparou função")
      console.log(data)
      setLogin(false);
      setToken("");
      localStorage.removeItem("@convergencefood:token");
      localStorage.removeItem("@convergencefood:user");
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, login, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};

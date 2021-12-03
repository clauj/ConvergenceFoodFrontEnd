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
  const [enderecos, setEnderecos] = useState(() => {
    const enderecos = localStorage.getItem("@convergencefood:enderecos");
    if(enderecos) return enderecos;
    else return [];
  });

  async function userLogin(email, password) {
    const loginForm = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      console.log("Carregando: " + loading)
      const {
        data: { token, user, enderecos },
      } = await api.post("auth/login", loginForm);
      localStorage.setItem("@convergencefood:token", token);
      localStorage.setItem("@convergencefood:user", JSON.stringify(user));
      localStorage.setItem("@convergencefood:enderecos", JSON.stringify(enderecos));
      setData(user);
      setEnderecos(enderecos);
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

      await api.post("auth/logout", {}, config);
      setData({});
      setLogin(false);
      setToken("");
      localStorage.removeItem("@convergencefood:token");
      localStorage.removeItem("@convergencefood:user");
      localStorage.removeItem("@convergencefood:enderecos");
      return <Redirect to="/" />
    } catch (error) {
      console.log(error);
    } finally {
    }
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, enderecos, login, loading, error, token }}
    >
      {children}
    </UserContext.Provider>
  );
};

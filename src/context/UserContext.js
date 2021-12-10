import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import api from "../service/api";
import { useHistory } from "react-router-dom";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(() => {
    const user = localStorage.getItem("@convergencefood:user");
    if (user) return JSON.parse(user)
    else return {};
  });
  const [login, setLogin] = useState(() => {
    const token = localStorage.getItem("@convergencefood:token");
    return !!token
  });
  const [token, setToken] = useState(() => {
    const token = localStorage.getItem("@convergencefood:token");
    if (token) return token;
    else return "";
  });
  const [enderecos, setEnderecos] = useState(() => {
    const enderecos = localStorage.getItem("@convergencefood:enderecos");
    if (enderecos) return enderecos;
    else return [];
  });
  const [assinatura, setAssinatura] = useState(() => {
    const assinatura = localStorage.getItem("@convergencefood:assinatura");
    if (assinatura) return assinatura;
    else return null;
  });
  const history = useHistory();

  async function userLogin(email, password) {
    const loginForm = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const {
        data: { token, user, enderecos, assinatura },
      } = await api.post("auth/login", loginForm);
      localStorage.setItem("@convergencefood:token", token);
      localStorage.setItem("@convergencefood:user", JSON.stringify(user));
      localStorage.setItem("@convergencefood:enderecos", JSON.stringify(enderecos));
      localStorage.setItem("@convergencefood:assinatura", JSON.stringify(assinatura));
      setEnderecos(enderecos);
      setData(user);
      setLogin(true);
      setError("");
      setToken(token);
      setAssinatura(assinatura)
      console.log("Login Assinaturas: ", assinatura)
    } catch (error) {
      const { response } = error;
      if (response) {
        if (response.status === 401) setError("Credenciais Inválidas");
      } else setError("Servidor não responde");
    } finally {
      setLoading(false);
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
      localStorage.removeItem("@convergencefood:assinatura");
      // history.push("/minhaconta");
    } catch (error) {
      console.log(error);
    }
  }

  async function getUser() {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const {data} = await api.get("user", config);
      console.log("user: ", data);
      setAssinatura(data.assinatura);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, setAssinatura, getUser, user: data, data, enderecos, login, loading, error, token, assinatura }}
    >
      {children}
    </UserContext.Provider>
  );
};

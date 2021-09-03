import React, { createContext, useState } from "react";
import { useHistory } from "react-router";
import api from "../service/api";

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = useState({});
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    } catch (error) {
      const { response } = error;
      if (response) {
        if (response.status === 401) setError("Credenciais Inválidas");
      } else setError("Servidor não responde");
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider value={{ userLogin, data, login, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const LoginContext = createContext(null);
function LogInProvider({ children }) {
  const [login, setLogin] = useState("");

  useEffect(() => {
    fetchLogin();
  }, []);

  function fetchLogin() {
    axios.get("/api/member/login").then((response) => setLogin(response.data));
  }

  function isAuthenticated() {
    return login !== "";
  }

  // 로그인 된 계정이 aimin인지 확인
  function isAdmin() {
    if (login.auth) {
      return login.auth.some((elem) => elem.name === "admin");
    }
    return false;
  }

  // function isManager() {
  //   return login.auth.some((elem) => elem.name === "manager");
  // }
  //
  // function hasAuth() {
  //   return login.auth.some((elem) => elem.name === auth);
  // }

  function hasAccess(userId) {
    return login.id === userId;
  }

  return (
    <LoginContext.Provider
      value={{ login, fetchLogin, isAuthenticated, hasAccess, isAdmin }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LogInProvider;

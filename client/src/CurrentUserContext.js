import React from "react";
import { useState, createContext, useEffect } from "react";

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`/api/me/profile`)
      .then((res) => res.json())
      .then((parsedRes) => {
        setCurrentUser(parsedRes);
        setStatus("idle");
      })
      .catch((error) => {
        setStatus("error");
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

import React, { useEffect, useState, useContext, createContext } from "react";

import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import useSettings from "./useSettings";

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const { selectedInstance } = useSettings();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userDataPath, setUserDataPath] = useState(null);
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      initializeUser(user)
    );
    return unsubscribe;
  }, [selectedInstance]);

  const initializeUser = async (user) => {
    if (user) {
      setIsLinked(
        user.providerData.some((provider) => provider.providerId === "password")
      );
      setUser(user);
      setUserDataPath(`/${user.uid}/${selectedInstance}`);
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };

  const reset = () => {
    setUser(null);
    setIsLinked(null);
    setUserDataPath(null);
  };

  const value = {
    user,
    userDataPath,
    isLinked,
    setIsLinked,
    setUser,
    isLoading,
    reset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default useAuth;

import React, { createContext } from "react";

export const AuthContextProvider = createContext(null);
const AuthProvider = ({ children }) => {
  const user = { name: "Amit" };
  const authInfo = { user };
  return (
    <AuthContextProvider.Provider value={authInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;

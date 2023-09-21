import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../Firebase/Firebase";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const AuthContextProvider = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user with email and password
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // Continue with google
  const googleSignUp = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axios
          .post("http://localhost:3030/jwt", {
            email: currentUser.email,
          })
          .then((data) => {
            localStorage.setItem("access-token", data.data.token);
            // console.log(data);
            setUser(currentUser);
            setLoading(false);
          });
      } else {
        localStorage.removeItem("access-token");
        setUser(null);
        setLoading(false);
      }
    });
    return () => {
      return unSubscribe();
    };
  }, []);
  const authInfo = { user, createUser, googleSignUp, logOut };
  return (
    <AuthContextProvider.Provider value={authInfo}>
      {children}
    </AuthContextProvider.Provider>
  );
};

export default AuthProvider;

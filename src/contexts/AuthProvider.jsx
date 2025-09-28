// src/contexts/AuthProvider.jsx
import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Use an inner async function to handle axios calls with await
      const handleUser = async () => {
        try {
          setUser(currentUser);

          if (currentUser && currentUser.email) {
            // 1) Save user to your DB (works for registration and login)
            const userInfo = {
              email: currentUser.email,
              name: currentUser.displayName || "",
            };

            // Save user to DB (don't block if this fails, but catch errors)
            try {
              await axios.post("http://localhost:5000/users", userInfo);
              // optional: console.log("Saved user to DB");
            } catch (saveErr) {
              console.error("Error saving user to DB:", saveErr);
            }

            // 2) Request JWT using the user's email
            try {
              const jwtRes = await axios.post("http://localhost:5000/jwt", {
                email: currentUser.email,
              });

              if (jwtRes?.data?.token) {
                localStorage.setItem("access-token", jwtRes.data.token);
              } else {
                localStorage.removeItem("access-token");
              }
            } catch (jwtErr) {
              console.error("Error requesting JWT:", jwtErr);
              localStorage.removeItem("access-token");
            }
          } else {
            // No user signed in
            localStorage.removeItem("access-token");
          }
        } finally {
          // Ensure loading is turned off in every case
          setLoading(false);
        }
      };

      handleUser();
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

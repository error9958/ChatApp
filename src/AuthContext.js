import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "./firebase";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [User, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      localStorage.setItem("userState", JSON.stringify(user));
      setUser(user);
    });
    return () => {
      unsub();
    };
  }, []);
  return (
    <AuthContext.Provider value={{ user: User }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

import React, { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export type ContextType = {
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  auth: any
}

const AuthContext = createContext<ContextType>({
  email: '',
  setEmail: () => {},
  password: '',
  setPassword: () => {},
  auth: null,
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <AuthContext.Provider value={{email, setEmail, password, setPassword, auth}}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}
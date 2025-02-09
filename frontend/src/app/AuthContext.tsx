"use client";
import React, { createContext, useContext, useState, useEffect, use } from "react";
import API from "./services/api";
import { useRouter } from 'next/navigation';
interface User {
  id: string;
  username: string;
  email: string;
  role: string; // 'admin_entidade', 'user_entidade', 'cliente'
  entity: String;
}

interface AuthContextProps {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role: string,) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, you can verify the token with the backend here
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      setUser(storedUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await API.post("/auth/login",{email, password })

      if (!response.status) {
        throw new Error("Login failed");
      }

      const data = response.data
      setUser(data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      if(!data.user.role){
        alert("Password ou Username errados")
      }else{
      if(data.user.role == "admin_entity"){
        router.push("/AdminHomePage")
      }else if(data.user.role == "user_entity"){
        router.push("/FuncionarioHomePage")
      }else{
        router.push("/ClientDashboardentidades")
      }
    }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const register = async (username: string, email: string, password: string, role: string) => {
    try {
      const response = await API.post("/auth/register",{ username, email, password, role })
      
      if (!response.status) {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;}
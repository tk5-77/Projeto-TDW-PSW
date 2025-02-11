"use client";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaChevronDown } from "react-icons/fa";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");

  const authContext = useAuth();
  const router = useRouter();

  if (!authContext) {
    return (
      <p className="text-red-500 text-center mt-4">
        Authentication context is not available.
      </p>
    );
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authContext.register(username, email, password, role);
      router.push("/login");
    } catch (err: any) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 transform transition-all hover:scale-105">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Registar</h1>
        <p className="text-gray-600 mb-8 text-center">Crie uma nova conta para começar</p>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="relative">
            <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full appearance-none px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="client">Client</option>
              <option value="admin_entity">Admin Entidade</option>
              <option value="user_entity">User Entidade</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className ="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-full hover:opacity-90 transition font-semibold text-lg shadow-md hover:shadow-lg"
          >
            Registar
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Já tem uma conta?  
          <a href="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
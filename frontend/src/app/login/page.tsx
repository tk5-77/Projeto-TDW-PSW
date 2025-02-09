"use client";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authContext.login(email, password);
    } catch (err: any) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Welcome back</h1>
        <p className="text-gray-500 mb-8 text-lg">Please login to your account</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Username or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded" /> Remember me
            </label>
            <a href="#" className="hover:underline text-blue-600 font-semibold">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-full hover:opacity-90 transition font-semibold text-lg shadow-md"
          >
            Log me in
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Don&apos;t have an account? 
          <a href="/registo" className="text-blue-600 hover:underline font-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

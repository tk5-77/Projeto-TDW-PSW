"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "../../services/api";
import { useAuth } from "../../AuthContext";
import Link from "next/link";

const CreateUserPage: React.FC = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "", role: "user_entity", entity: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const authContext = useAuth();
  if (!authContext) {
    return <p className="text-red-500 text-center mt-4">Authentication context is not available.</p>;
  }

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {...user, entity: authContext.user?.entity});
      router.push("/AdminHomePage");
    } catch (error) {
      console.error("Failed to create user", error);
      setError("Failed to create user");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="w-full bg-white border-b py-4 px-6 flex justify-between items-center">
        <h1 className="text-blue-600 text-2xl font-bold">Cinfães Fit & Barber</h1>
        <nav className="space-x-4">
          <Link href="/AdminHomePage" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        </nav>
      </header>
      <div className="w-full h-12"></div>
      <div className="flex flex-col items-center justify-center flex-grow mb-20">
        <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Criar Funcionario</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleCreateUser} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-all"
            >
              Create User
            </button>
          </form>
        </div>
      </div>
      <footer className="w-full bg-black text-white py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-between">
          <div>
            <h2 className="text-xl font-semibold">Logo</h2>
            <p className="text-sm">A new way to make the payments easy, reliable and secure.</p>
          </div>
          <div>
            <h3 className="font-semibold">Useful Links</h3>
            <ul className="text-sm">
              <li>Content</li>
              <li>How it Works</li>
              <li>Create</li>
              <li>Explore</li>
              <li>Terms & Services</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Community</h3>
            <ul className="text-sm">
              <li>Help Center</li>
              <li>Partners</li>
              <li>Suggestions</li>
              <li>Blog</li>
              <li>Newsletters</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Partner</h3>
            <ul className="text-sm">
              <li>Our Partner</li>
              <li>Become a Partner</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm mt-4">&copy; 2025 Cinfães Fit & Barber. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default CreateUserPage;

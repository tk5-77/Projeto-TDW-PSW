"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import API from "../services/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.trimStart() });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validar campos obrigatórios
        if (!formData.username || !formData.email || !formData.password) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const res = await API.post("/auth/register", formData);

            setSuccess(res.data.message);
            setError("");
            setTimeout(() => router.push
            ("/login"), 3000); // Redireciona após 3 segundos
        } catch (err: unknown) {
            if (err instanceof Error && (err as { response?: { data?: { message?: string } } }).response?.data?.message) {
                if (err instanceof Error && (err as { response?: { data?: { message?: string } } }).response?.data?.message) {
                    setError((err as unknown as { response: { data: { message: string } } }).response.data.message);
                } else {
                    setError("Erro ao registar o utilizador.");
                }
            } else {
                setError("Erro ao registar o utilizador.");
            }
            setSuccess("");
        }
    };

    return (
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
            <Header />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2rem",
                    padding: "2rem",
                    background: "#f0f0f0",
                    minHeight: "100vh",
                }}
            >
                <h1 style={{ fontSize: "3rem", marginBottom: "1.5rem", color: "#333", fontWeight: "bold", textTransform: "uppercase" }}>
                    Página de Registo
                </h1>

                {error && (
                    <div style={{ color: "red", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>
                        {error}
                    </div>
                )}

                {success && (
                    <div style={{ color: "green", fontSize: "1.2rem", fontWeight: "bold", marginBottom: "1rem" }}>
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: "400px" }}>
                    <label style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold" }}>
                        Nome de Utilizador:
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            placeholder="Digite seu nome de utilizador"
                            style={{
                                width: "100%",
                                padding: "1rem",
                                marginTop: "10px",
                                borderRadius: "8px",
                                border: "2px solid #ccc",
                                fontSize: "1.2rem",
                            }}
                        />
                    </label>

                    <label style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem" }}>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Digite seu email"
                            style={{
                                width: "100%",
                                padding: "1rem",
                                marginTop: "10px",
                                borderRadius: "8px",
                                border: "2px solid #ccc",
                                fontSize: "1.2rem",
                            }}
                        />
                    </label>

                    <label style={{ display: "block", fontSize: "1.5rem", fontWeight: "bold", marginTop: "1rem" }}>
                        Senha:
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="Digite sua senha"
                            style={{
                                width: "100%",
                                padding: "1rem",
                                marginTop: "10px",
                                borderRadius: "8px",
                                border: "2px solid #ccc",
                                fontSize: "1.2rem",
                            }}
                        />
                    </label>

                    <button
                        type="submit"
                        style={{
                            padding: "1rem 2rem",
                            fontSize: "1.5rem",
                            backgroundColor: "#0070f3",
                            color: "#fff",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            transition: "background 0.3s ease, transform 0.3s ease",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            marginTop: "2rem",
                        }}
                    >
                        Registar
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

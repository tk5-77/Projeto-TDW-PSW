import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header 
      style={{
        backgroundColor: "#0070f3", 
        padding: "20px", 
        color: "white", 
        width: "100%", 
        position: "absolute", 
        top: 0, 
        left: 0, 
        right: 0 
      }}
    >
      <h1 style={{ margin: 0, fontSize: "2.5rem" }}>
        Cinfães Fit & Barber
      </h1>
      <nav style={{ fontSize: "1.5rem" }}>
        <Link
          href="/"
          style={{
            color: "#fff",
            margin: "0 2rem", // Aumentado o espaçamento entre os links
            textDecoration: "none",
          }}
        >
          Início
        </Link>
        <Link
          href="/ginasio"
          style={{
            color: "#fff",
            margin: "0 2rem",
            textDecoration: "none",
          }}
        >
          Ginásio
        </Link>
        <Link
          href="/barbearia"
          style={{
            color: "#fff",
            margin: "0 2rem",
            textDecoration: "none",
          }}
        >
          Barbearia
        </Link>
        {/* Link para a página de login */}
        <Link
          href="/login"
          style={{
            color: "#fff",
            margin: "0 2rem",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;

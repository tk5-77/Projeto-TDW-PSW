import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header style={{ backgroundColor: "#2d9cdb", padding: "10px", color: "white" }}>
      <h1>Bem-vindo ao nosso Serviço</h1>
  
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: #2d9cdb;
          color: white;
        }
        .logo h1 {
          margin: 0;
        }
        nav ul {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        nav ul li {
          margin-right: 20px;
        }
        nav ul li:last-child {
          margin-right: 0;
        }
        nav a {
          color: white;
          text-decoration: none;
          font-weight: bold;
        }
        nav a:hover {
          text-decoration: underline;
        }
      `}</style>
    </header>
  );
};

export default Header;

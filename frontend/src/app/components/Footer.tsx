import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#333", padding: "10px", color: "white", marginTop: "20px" }}>
      <p>&copy; 2025 - Todos os direitos reservados</p>
      <style jsx>{`
        .footer {
          background-color: #333;
          color: white;
          text-align: center;
          padding: 10px;
          position: fixed;
          bottom: 0;
          width: 100%;
        }
        .footer p {
          margin: 0;
        }
      `}</style>
    </footer>
  );
};

export default Footer;

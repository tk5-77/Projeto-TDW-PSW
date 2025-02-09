import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Service Manager. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
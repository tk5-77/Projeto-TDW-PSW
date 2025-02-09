// Header Component
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Header.css";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const renderLinks = () => {
    if (!user) {
      return (
        <nav className="header__nav">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      );
    }

    if (user.role === "client") {
      return (
        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/client/bookings">Gestao de Serviçoss</Link>
          <Link to="/Client/ReservarServiços">Serviços</Link>
          <button onClick={logout} className="header__logout">Logout</button>
        </nav>
      );
    }

    if (user.role === "admin_entity") {
      return (
        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/services">Detalhes de Serviços</Link>
          <Link to="/turnos"></Link>
          <button onClick={logout} className="header__logout">Logout</button>
        </nav>
      );
    }

    if (user.role === "admin") {
      return (
        <nav className="header__nav">
          <Link to="/">Home</Link>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/users">Manage Users</Link>
          <button onClick={logout} className="header__logout">Logout</button>
        </nav>
      );
    }
  };

  return (
    <header className="header">
      <div className="header__logo">Service Manager</div>
      {renderLinks()}
    </header>
  );
};

export default Header;



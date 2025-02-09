import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="home-page__content">
        <h1>Welcome to Service Manager</h1>
        <p>Your one-stop platform for managing services, bookings, and more.</p>

        <div className="home-page__sections">
          <section>
            <h2>Register as a Client</h2>
            <p>Create an account to book services and manage your appointments.</p>
            <Link to="/register?role=client" className="home-page__link">Register as Client</Link>
          </section>

          <section>
            <h2>Register as an Entity</h2>
            <p>Create an account to manage services and turnos for your organization.</p>
            <Link to="/register?role=entity" className="home-page__link">Register as Entity Admin</Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default HomePage;
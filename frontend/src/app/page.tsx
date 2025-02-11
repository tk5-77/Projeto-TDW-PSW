"use client";

import { useEffect } from "react";
import Link from "next/link";
import { FiCalendar, FiClock, FiScissors, FiArrowRight } from "react-icons/fi";

export default function Home() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="font-poppins bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Enhanced Header */}
      <header className="flex justify-between items-center py-6 px-8 lg:px-20 bg-white shadow-sm sticky top-0 z-50">
        <Link href="/">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <FiScissors size={28} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Bookify</h1>
          </div>
        </Link>
        <nav>
          <ul className="flex space-x-8 text-gray-700 font-medium items-center">
            <li>
              <Link href="/" className="relative group">
                <span className="hover:text-blue-600 transition-all px-2 py-1">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all shadow-lg">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section with Gradient */}
      <section className="relative w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-24 lg:py-36 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6 animate-fadeInUp">
            Eleve a sua Experiência de Beleza e Bem-Estar
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto mb-12">
            Agendamento inteligente e gestão para clientes e Empresarios 
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/registo" className="group relative">
              <div className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
                Começar Agora
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50/50"></div>
      </section>

      {/* Features Section with Icons */}
      <section className="max-w-7xl mx-auto py-20 px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">A sua necessidade, a nossa Prioridade</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tecnologia e cuidado pessoal trabalhando juntos para sua melhor experiência
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<FiCalendar className="w-8 h-8" />} 
            title="Agendamento 24/7" 
            text="Marque seu horário enquanto cliente quando e onde quiser, de forma simples e rápida."
          />
          <FeatureCard 
            icon={<FiClock className="w-8 h-8" />} 
            title="Gestão de Tempo" 
            text="Oferta de Serviços e gestao por parte de Admnistradores ."
          />
          <FeatureCard 
            icon={<FiScissors className="w-8 h-8" />} 
            title="Serviços Premium" 
            text="Gestao de Serviços por parte de Funcionarios de Admnistrador"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Como Funciona</h2>
            <p className="text-gray-600 text-lg">O seu cuidado em 3 passos simples</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard 
              number="1" 
              title="Escolha o seu Serviço"
              text="Selecione entre cortes modernos, tratamentos faciais ou serviços de bem-estar."
            />
            <StepCard 
              number="2" 
              title="Agende o seu Horário"
              text="Escolha o melhor dia e horário em nossa agenda digital disponível 24 horas."
            />
            <StepCard 
              number="3" 
              title="Experiência Unica e Premium"
              text="Aproveite seu momento de cuidado pessoal com profissionais qualificados."
            />
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-8 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Bookify</h3>
            <p className="text-sm">Elevando padrões de beleza e bem-estar desde 2025</p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Cortes Premium</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tratamentos Faciais</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Bem-Estar</a></li>
            </ul>
          </div>  
          <div>
            <h4 className="text-white font-medium mb-4">Contato</h4>
            <ul className="space-y-2 text-sm">
              <li>Bairro da Tapada, 241</li>
              <li>contato@Bookify.pt</li>
              <li>+351 912 345 678</li>
            </ul>
          </div>
          <div> 
            <h4 className="text-white font-medium mb-4">Siga-nos</h4>
            <div className="flex space-x-4">
              <SocialIcon href="#" label="Facebook" />
              <SocialIcon href="#" label="Instagram" />
              <SocialIcon href="#" label="WhatsApp" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reusable Components
const FeatureCard = ({ icon, title, text }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </div>
);

const StepCard = ({ number, title, text }) => (
  <div className="relative bg-white p-8 rounded-2xl shadow-lg border border-gray-100 group hover:border-blue-400 transition-colors">
    <div className="absolute -top-6 left-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
      {number}
    </div>
    <h3 className="text-2xl font-semibold mb-4 mt-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{text}</p>
  </div>
);

const SocialIcon = ({ href, label }) => (
  <a href={href} className="bg-gray-800 p-3 rounded-lg hover:bg-blue-600 transition-colors">
    <span className="sr-only">{label}</span>
    {/* Replace with actual icons */}
    <div className="w-5 h-5 bg-gray-400"></div>
  </a>
);
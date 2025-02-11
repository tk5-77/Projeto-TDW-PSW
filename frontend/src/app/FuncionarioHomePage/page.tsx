"use client";

import { useEffect } from "react";
import Link from "next/link";
import { 
  UserGroupIcon, 
  CalendarDaysIcon, 
  ScissorsIcon, 
  ChartBarIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon
} from "@heroicons/react/24/outline";

function Header() {
  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
              <ScissorsIcon className="h-8 w-8 mr-2" />
              Bookify
            </Link>
          </div>

          {/* Menu Direito */}
          <div className="flex items-center gap-6">
            <Link 
              href="/FuncionarioServicosAssociados" 
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Gerir Serviços
            </Link>
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bookify</h3>
            <p className="text-gray-400">
              Sistema profissional de gestão de Serviços
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/sobre" className="hover:text-blue-500 transition-colors">Sobre</Link></li>
              <li><Link href="/servicos" className="hover:text-blue-500 transition-colors">Serviços</Link></li>
              <li><Link href="/contato" className="hover:text-blue-500 transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/privacidade" className="hover:text-blue-500 transition-colors">Privacidade</Link></li>
              <li><Link href="/termos" className="hover:text-blue-500 transition-colors">Termos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <BuildingOffice2Icon className="h-5 w-5 mr-2" />
                Cadimas-3505
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                (351) 96234-5678
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                tino@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Bookify. Todos direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default function AdminHome() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="font-sans bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="w-full relative overflow-hidden mt-16">
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
          <div className="relative z-10 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
              Controlo Total da Sua 
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Operação
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto md:mx-0 mb-8">
              Ferramentas integradas para gestão eficiente de serviços, clientes e agendamentos
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="/FuncionarioServicosAssociados"
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl 
                         hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ScissorsIcon className="h-6 w-6" />
                Gerir Serviços
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-100/50 to-transparent" />
        </div>
      </section>

      {/* Seção de Recursos */}
      <div className="relative py-24 skew-y-3 bg-white mt-24 mb-32">
        <div className="max-w-7xl mx-auto px-4 -skew-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Controle Completo em <span className="text-blue-600">3 Pilares</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <div className="mb-6">
                <div className="w-fit p-4 bg-blue-100 rounded-xl">
                  <UserGroupIcon className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Gestão de Utilizadores</h3>
              <p className="text-gray-600 leading-relaxed">
                Administre perfis, permissões e acesso de colaboradores e clientes
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-b from-white to-purple-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <div className="mb-6">
                <div className="w-fit p-4 bg-purple-100 rounded-xl">
                  <ScissorsIcon className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Controlo de Serviços</h3>
              <p className="text-gray-600 leading-relaxed">
                Crie e personalize serviços com horários e valores personalizados
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-b from-white to-teal-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
              <div className="mb-6">
                <div className="w-fit p-4 bg-teal-100 rounded-xl">
                  <CalendarDaysIcon className="h-8 w-8 text-teal-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Agendamentos</h3>
              <p className="text-gray-600 leading-relaxed">
                Gerencie reservas e otimize sua capacidade de atendimento
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Estatísticas */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-16 text-white shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Dashboard Integrado
                <span className="block text-blue-200 mt-2 text-xl">
                  Dados em tempo real
                </span>
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Acompanhe métricas essenciais e tome decisões estratégicas
              </p>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 bg-white/10 px-6 py-3 rounded-lg
                         hover:bg-white/20 transition-all border border-white/20"
              >
                <ChartBarIcon className="h-5 w-5" />
                Acessar Dashboard
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/10 p-8 rounded-2xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-6 bg-white/5 rounded-xl">
                    <div className="text-3xl font-bold mb-2">152</div>
                    <div className="text-sm">Agendamentos</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl">
                    <div className="text-3xl font-bold mb-2">87%</div>
                    <div className="text-sm">Ocupação</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl">
                    <div className="text-3xl font-bold mb-2">$ 12,4k</div>
                    <div className="text-sm">Faturamento</div>
                  </div>
                  <div className="p-6 bg-white/5 rounded-xl">
                    <div className="text-3xl font-bold mb-2">4.8★</div>
                    <div className="text-sm">Avaliações</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
// "use client";

// import { useEffect } from "react";
// import Link from "next/link";

// export default function AdminHome() {
//   useEffect(() => {
//     document.body.style.overflowX = "hidden";
//     return () => {
//       document.body.style.overflowX = "auto";
//     };
//   }, []);

//   return (
//     <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow z-10">
//         <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-blue-600">
//               Cinfães Fit & Barber
//             </h1>
//           </div>
//           <div className="flex space-x-6">
//             <Link
//               href="/"
//               className="text-gray-700 hover:text-blue-600 transition"
//             >
//               Home
//             </Link>
//             <Link
//               href="/login"
//               className="text-gray-700 hover:text-blue-600 transition"
//             >
//               Login
//             </Link>
//           </div>
//         </nav>
//       </header>

//       {/* Seção de destaque / Hero */}
//       <section className="relative w-full bg-blue-600 text-white text-center py-32">
//         <div className="max-w-6xl mx-auto px-8">
//           <h1 className="text-6xl font-bold leading-tight">
//             Painel do Administrador
//           </h1>
//           <p className="text-2xl mt-4">Gerencie sua plataforma com facilidade</p>
//           <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
//             <Link href="/AdminCriarEntidade">
//               <span className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer">
//                 Criar Entidade
//               </span>
//             </Link>
//             <Link href="/AdminDashboardEntidades">
//               <span className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer">
//                 Dashbaord Entidades
//               </span>
//             </Link>
//             <Link href="/AdminCreateFuncionario">
//               <span className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer">
//                 Criar Funcionário
//               </span>
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Conteúdo principal */}
//       <section className="max-w-7xl mx-auto py-24 px-8 text-center">
//         <h2 className="text-5xl font-bold mb-12">O que você pode gerenciar?</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
//             <h3 className="text-3xl font-semibold mb-4">Usuários</h3>
//             <p className="text-lg text-gray-700">
//               Crie, edite e remova usuários da plataforma.
//             </p>
//           </div>
//           <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
//             <h3 className="text-3xl font-semibold mb-4">Serviços</h3>
//             <p className="text-lg text-gray-700">
//               Adicione e configure serviços disponíveis.
//             </p>
//           </div>
//           <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
//             <h3 className="text-3xl font-semibold mb-4">Agendamentos</h3>
//             <p className="text-lg text-gray-700">
//               Gerencie e monitore os agendamentos dos usuários.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-white border-t py-8 mt-auto">
//         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
//           <div className="mb-4 md:mb-0 text-center md:text-left">
//             <p className="text-gray-700">
//               © 2025 Cinfães Fit & Barber. Todos os direitos reservados.
//             </p>
//           </div>
//           <div className="flex space-x-4">
//             <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
//               Login
//             </Link>
//             <Link href="/AdminCriarEntidade" className="text-gray-700 hover:text-blue-600 transition">
//               Criar Entidade
//             </Link>
//             <Link href="/GestaodeEntidade" className="text-gray-700 hover:text-blue-600 transition">
//               Gerenciar Entidades
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import API from "../services/api"; // Ajuste o caminho conforme sua estrutura
import { useAuth } from "../AuthContext";

export default function AdminHome() {
  const router = useRouter();
  const authContext = useAuth();
  
  // Essa função será chamada quando o admin clicar no botão de Dashboard Entidades
  const handleDashboardEntities = async () => {
    router.push(`/AdminDashboardEntidades`);
  };

  const handleCreateFuncionarios = async () => {
      router.push("/AdminCreateFuncionario/" + authContext?.user?.entity);
  };

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    return () => {
      document.body.style.overflowX = "auto";
    };
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow z-10">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Cinfães Fit & Barber
            </h1>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* Seção de destaque / Hero */}
      <section className="relative w-full bg-blue-600 text-white text-center py-32">
        <div className="max-w-6xl mx-auto px-8">
          <h1 className="text-6xl font-bold leading-tight">
            Painel do Administrador
          </h1>
          <p className="text-2xl mt-4">Gerencie sua plataforma com facilidade</p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/AdminCriarEntidade">
              <span className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer">
                Criar Entidade
              </span>
            </Link>
            {/* Em vez de um Link fixo, usamos um botão que dispara a função handleDashboardEntities */}
            <button
              onClick={handleDashboardEntities}
              className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer"
            >
              Dashboard Entidades
            </button>
            <button onClick={handleCreateFuncionarios}>
              <span className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 transition-all cursor-pointer">
                Criar Funcionário
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Conteúdo principal */}
      <section className="max-w-7xl mx-auto py-24 px-8 text-center">
        <h2 className="text-5xl font-bold mb-12">O que você pode gerenciar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-3xl font-semibold mb-4">Usuários</h3>
            <p className="text-lg text-gray-700">
              Crie, edite e remova usuários da plataforma.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-3xl font-semibold mb-4">Serviços</h3>
            <p className="text-lg text-gray-700">
              Adicione e configure serviços disponíveis.
            </p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-3xl font-semibold mb-4">Agendamentos</h3>
            <p className="text-lg text-gray-700">
              Gerencie e monitore os agendamentos dos usuários.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-700">
              © 2025 Cinfães Fit & Barber. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">
              Login
            </Link>
            <Link href="/AdminCriarEntidade" className="text-gray-700 hover:text-blue-600 transition">
              Criar Entidade
            </Link>
            <Link href="/GestaodeEntidade" className="text-gray-700 hover:text-blue-600 transition">
              Gerenciar Entidades
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
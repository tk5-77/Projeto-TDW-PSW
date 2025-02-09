'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import API from '../../services/api';
import { ClockIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Service {
  _id: string;
  type: string;
  duration: number;
  capacity: number;
  publicDescription: string;
  imageUrl?: string;
}

const Header = () => (
  <header className="bg-white border-b border-gray-100">
    <div className="container mx-auto px-4 py-5">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl"></span>
          </div>
          <span className="text-2xl font-semibold text-gray-900">Bookify</span>
        </Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/ClineteHomePage"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/Login"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/contato"
                className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-900 border-t border-gray-800">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-lg mb-4">Contato</h3>
          <div className="flex items-center space-x-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-400">tino@gamail.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-gray-400">(352) 983625274</span>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Links Rápidos</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors duration-300">
                Sobre Nós
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/termos" className="text-gray-400 hover:text-white transition-colors duration-300">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-4">Redes Sociais</h3>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 4.004-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-4.004-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MinhaEmpresa. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

const EntityServices = () => {
  const { entityId } = useParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!entityId) return;

    const fetchServices = async () => {
      try {
        const response = await API.get(`/services/entity/${entityId}`);
        setServices(response.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [entityId]);

  if (loading) return <p className="text-center mt-10">Carregando serviços...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nossos Serviços Exclusivos
          </h1>
          <p className="text-xl text-gray-600">
            Descubra a excelência em cada detalhe dos nossos serviços premium
          </p>
        </div>

        {services.length === 0 ? (
          <div className="text-center py-20">
            <SparklesIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <p className="text-2xl text-gray-500">Novos serviços em breve!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

const ServiceCard = ({ service }: { service: Service }) => (
  <Link href={`/ClienteServicoAgendar/${service._id}`}>
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer group">
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        {service.imageUrl ? (
          <img
            src={service.imageUrl}
            alt={service.type}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-50 to-cyan-50 flex items-center justify-center">
            <SparklesIcon className="h-16 w-16 text-blue-200 group-hover:text-blue-300 transition-colors duration-300" />
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
          {service.type}
        </h3>
        <p className="text-gray-600 mb-5 line-clamp-3">{service.publicDescription}</p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <ClockIcon className="h-5 w-5 text-blue-600" />
            <span>{service.duration} minutos</span>
          </div>
          <div className="flex items-center space-x-2">
            <UserGroupIcon className="h-5 w-5 text-blue-600" />
            <span>Até {service.capacity} pessoas</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default EntityServices;
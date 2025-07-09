import { useState } from "react";
import { useUserRole } from "../hooks/useUserRole";
import { logout } from "../services/auth";
import { useNavigate } from "@remix-run/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const userRole = useUserRole();
  const isAdmin = userRole === "ADMIN";
  const isAuthenticated = userRole !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full">
      <nav className="fixed top-0 left-0 w-full bg-background-white/90 backdrop-blur-md shadow-lg z-50 border-b border-primary/10">
        <div className="w-full px-4 md:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo section */}
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img
                  className="h-10 w-auto transition-transform duration-300 hover:scale-110"
                  src="/imagenes/amadeus-logo-dark-sky.png"
                  alt="logo"
                />
              </a>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="/"
                className="text-text hover:text-primary transition-all duration-300 text-lg font-medium"
              >
                Inicio
              </a>
              <a
                href="https://amadeus.com/es/contacto"
                target="_blank"
                rel="noreferrer noopener"
                className="text-text hover:text-primary transition-all duration-300 text-lg font-medium"
              >
                Contacto
              </a>
              {isAdmin && (
                <a
                  href="/reports/destinations"
                  className="text-text hover:text-primary transition-all duration-300 text-lg font-medium"
                >
                  Reporte
                </a>
              )}
              <a
                href="https://amadeus.com/en"
                target="_blank"
                rel="noreferrer noopener"
                className="text-text hover:text-primary transition-all duration-300 text-lg font-medium"
              >
                Amadeus
              </a>
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="text-text hover:text-danger transition-all duration-300 text-lg font-medium flex items-center gap-2"
                  title="Cerrar sesión"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Cerrar sesión
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-text hover:text-primary transition-all duration-300"
                aria-expanded={isOpen}
              >
                <svg
                  className={`h-6 w-6 ${isOpen ? "hidden" : "block"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`h-6 w-6 ${isOpen ? "block" : "hidden"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:hidden bg-background-white/95 text-text border-t border-primary/10`}
        >
          <div className="px-4 py-3 space-y-2">
            <a
              href="/"
              className="block text-lg font-medium hover:text-primary transition-all duration-300"
            >
              Inicio
            </a>
            <a
              href="https://amadeus.com/es/contacto"
              target="_blank"
              rel="noreferrer noopener"
              className="block text-lg font-medium hover:text-primary transition-all duration-300"
            >
              Contacto
            </a>
            {isAdmin && (
              <a
                href="/reports/destinations"
                className="block text-lg font-medium hover:text-primary transition-all duration-300"
              >
                Reporte
              </a>
            )}
            <a
              href="https://amadeus.com/en"
              target="_blank"
              rel="noreferrer noopener"
              className="block text-lg font-medium hover:text-primary transition-all duration-300"
            >
              Amadeus
            </a>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="block text-lg font-medium hover:text-danger transition-all duration-300 w-full text-left"
                title="Cerrar sesión"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
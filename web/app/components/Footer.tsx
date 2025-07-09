export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-primary to-primary-dark text-white border-t border-white/10 py-10 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src="https://www.amadeus.com/static/custom/resources/20230829162608/dist/images/header-logo.svg"
            alt="Amadeus"
            className="h-10 filter invert brightness-200 drop-shadow"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://cdn.icon-icons.com/icons2/2699/PNG/512/amadeus_logo_icon_170290.png";
            }}
          />
          <span className="font-semibold text-xl tracking-wide text-accent">Travel Technology</span>
        </div>
        <nav className="flex gap-10 text-lg font-semibold">
          <a
            href="https://amadeus.com/es/contacto"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Contacto
          </a>
          <a
            href="https://amadeus.com/es/politicas/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Privacidad
          </a>
          <a
            href="https://amadeus.com/en"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            Amadeus
          </a>
        </nav>
        <div className="text-lg text-white/80 text-center md:text-right font-medium">
          © {new Date().getFullYear()} Null Pointers. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
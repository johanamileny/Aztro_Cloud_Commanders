import { Link } from "@remix-run/react";

export default function Start() {
  return (
    <div className="relative w-full h-[98vh] flex flex-col justify-center items-center text-white text-center px-8 sm:px-12 md:px-20 font-montserrat">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#000835]/80 via-[#1a1f35]/70 to-[#000835]/90 bg-cover bg-center bg-fixed transition-all duration-700 ease-in-out"
        style={{ backgroundImage: "url('/assets/img/homepage-amadeus.jpg')" }}
      ></div>
      <div className="absolute inset-0 backdrop-blur-[12px] bg-gradient-to-t from-black/40 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-center items-center p-16 w-[95%] max-w-4xl h-auto min-h-[400px] md:min-h-[600px] bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl animate-float-slow">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-10 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent animate-pulse-slow drop-shadow">
          Tu próxima gran aventura comienza aquí
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl opacity-95 mb-12 text-blue-100 font-semibold drop-shadow">
          Explora destinos inolvidables y crea recuerdos para toda la vida.
        </p>
        <Link
          to="/login"
          className="inline-block bg-gradient-to-r from-[#00d4ff] to-[#0047ff] text-white px-12 py-6 text-3xl font-bold rounded-2xl no-underline transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00d4ff]/20 w-[80%] sm:w-[60%] md:w-[50%] text-center border border-white/30 backdrop-blur-sm"
        >
          ¡Empieza tu aventura!
        </Link>
      </div>
    </div>
  );
}
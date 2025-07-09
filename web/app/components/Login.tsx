import React, { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { LoginFormValues } from "../interfaces/loginForm";
import { authenticate } from "../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: LoginFormValues = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    if (!data.email || !data.password) {
      setErrorMessage("Todos los campos son obligatorios");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      const user = await authenticate(data.email, data.password);
      if (user) {
        sessionStorage.setItem(
          "userAuthData",
          JSON.stringify({
            token: user.token,
            role: user.userType,
            email: data.email,
          })
        );

        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = `token=${user.token}; path=/; SameSite=Strict;`;
        console.log("Current cookies:", document.cookie);

        // Dispatch custom event to notify userAuth changes
        window.dispatchEvent(new Event("userAuthChange"));

        if (user.userType === "ADMIN") {
          navigate("/reports/destinations");
        } else if (user.userType === "CLIENT") {
          navigate("/tarjetas");
        }
      } else {
        setErrorMessage("Usuario no existe");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error al autenticar:", error);
      setErrorMessage("Error en la solicitud.");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#001140] via-[#0033A0] to-[#75B000] relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('/imagenes/login-bg.jpg')] bg-cover bg-center opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[8px] pointer-events-none"></div>
      {/* Formulario */}
      <form
        id="formRegister"
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-6 sm:px-10 py-10 flex flex-col gap-8 border border-white/30"
      >
        <div className="flex flex-col items-center mb-2">
          <img
            src="/imagenes/amadeus-logo-dark-sky.png"
            alt="Amadeus"
            className="h-14 mb-2"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1 drop-shadow text-center">
            Iniciar Sesión
          </h2>
          <p className="text-base sm:text-lg text-gray-700 font-medium text-center">
            Bienvenido de nuevo
          </p>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Introduce tu correo electrónico"
          required
          autoComplete="email"
          className="input bg-white text-gray-900 placeholder:text-gray-500 border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary transition-all text-base sm:text-lg py-3 px-4 rounded-lg shadow"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Introduce tu contraseña"
          required
          autoComplete="current-password"
          className="input bg-white text-gray-900 placeholder:text-gray-500 border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary transition-all text-base sm:text-lg py-3 px-4 rounded-lg shadow"
        />
        <button
          type="submit"
          className="sessionButton w-full py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg sm:text-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all"
          id="button"
        >
          Iniciar Sesión
        </button>
        <div className="registerLinkContainer flex flex-col items-center gap-2 mt-2">
          <span className="text-base text-gray-700">¿Aún no tienes cuenta?</span>
          <a
            href="/record"
            className="registerLink text-primary font-bold text-base hover:underline hover:text-primary-dark transition-colors"
          >
            <strong>Registrarse</strong>
          </a>
        </div>
        {errorMessage && (
          <div
            id="mensaje-error"
            className="snackbar absolute top-6 right-6 bg-red-600/90 text-white px-6 py-4 rounded-xl shadow-2xl z-20 animate-fadeIn text-base"
          >
            <p>{errorMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { registerUser } from "../services/recordService";
import { UserRecord } from "~/interfaces/UserRecord";

const RegisterForm: React.FC = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const user: UserRecord = {
      email: formData.get("email") as string,
      nombre: formData.get("nombre") as string,
      password: formData.get("password") as string,
      userType: selectedRole,
    };

    if (!user.email || !user.nombre || !user.password || !user.userType) {
      setErrorMessage("Todos los campos son obligatorios.");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      const response = await registerUser(user);
      setSuccessMessage(true);
      setTimeout(() => {
        window.location.href = "/login";
        setSuccessMessage(false);
      }, 3000);
    } catch (error) {
      setErrorMessage("El usuario ya existe");
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxChecked(event.target.checked);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#001140] via-[#0033A0] to-[#75B000] relative overflow-hidden py-12">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('/imagenes/register-bg.jpg')] bg-cover bg-center opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[8px] pointer-events-none"></div>
      <form
        id="formRegister"
        className="h-screen w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl px-6 sm:px-10 py-10 flex flex-col gap-8 border border-white/30"
        onSubmit={handleSubmit}
      >
        {/* Mensajes de éxito y error dentro de la card */}
        {successMessage && (
          <div
            id="mensaje-exito"
            className="snackbar mb-2 bg-green-600/90 text-white px-6 py-4 rounded-xl shadow-2xl z-20 animate-fadeIn text-base text-center"
          >
            <p>¡Registro exitoso! Redirigiendo...</p>
          </div>
        )}
        {errorMessage && (
          <div
            id="mensaje-error"
            className="snackbar mb-2 bg-red-600/90 text-white px-6 py-4 rounded-xl shadow-2xl z-20 animate-fadeIn text-base text-center"
          >
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="flex flex-col items-center mb-2">
          <img
            src="/imagenes/amadeus-logo-dark-sky.png"
            alt="Amadeus"
            className="h-14 mb-2"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-1 drop-shadow text-center">
            Crear Cuenta
          </h2>
          <p className="text-base sm:text-lg text-gray-700 font-medium text-center">
            Únete a la próxima aventura
          </p>
        </div>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Correo electrónico"
          required
          className="input bg-white text-gray-900 placeholder:text-gray-500 border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary transition-all text-base sm:text-lg py-3 px-4 rounded-lg shadow"
        />
        <input
          type="text"
          id="nombre"
          name="nombre"
          placeholder="Nombre completo"
          required
          className="input bg-white text-gray-900 placeholder:text-gray-500 border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary transition-all text-base sm:text-lg py-3 px-4 rounded-lg shadow"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Contraseña"
          required
          className="input bg-white text-gray-900 placeholder:text-gray-500 border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary transition-all text-base sm:text-lg py-3 px-4 rounded-lg shadow"
        />
        <select
          value={selectedRole}
          onChange={handleRoleChange}
          required
          aria-label="Selecciona tu rol"
          className="input bg-white text-gray-900 border-2 border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary transition-all text-base sm:text-lg py-3 px-4 rounded-lg shadow"
        >
          <option value="" disabled>
            Selecciona tu rol
          </option>
          <option value="CLIENT">Cliente</option>
          <option value="ADMIN">Administrador</option>
        </select>
        <label
          className="flex items-center gap-3 text-gray-700 text-base sm:text-lg"
          id="terms"
        >
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            checked={isCheckboxChecked}
            className="accent-primary w-5 h-5"
          />
          <span>
            Acepto los{" "}
            <a
              id="terms-link"
              href="https://amadeus.com/es/politicas/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary hover:text-primary-dark"
            >
              <strong>términos y condiciones</strong>
            </a>{" "}
            de la política de protección de datos.
          </span>
        </label>
        <button
          className="registerButton w-full py-3 rounded-lg bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg sm:text-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all disabled:opacity-60"
          id="button"
          type="submit"
          disabled={!isCheckboxChecked}
        >
          Registrarse
        </button>
        <div className="flex flex-col items-center gap-2 mt-2">
          <span className="text-base text-gray-700">¿Ya tienes una cuenta?</span>
          <a
            href="/login"
            className="registerLink text-primary font-bold text-base hover:underline hover:text-primary-dark transition-colors"
          >
            Inicia sesión
          </a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

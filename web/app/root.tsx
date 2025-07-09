import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Footer from "./components/Footer";
import "./tailwind.css";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
    defer: true,
  },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com",
  },
  {
    href: "https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap",
    rel: "stylesheet",
    defer: true,
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css",
    integrity: "sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==",
    crossOrigin: "anonymous",
    referrerPolicy: "no-referrer",
  },
];

export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background-white text-text min-h-screen">
        <Navbar />
        {/* Espaciado superior para la navbar y espaciado inferior para el footer */}
        <div id="detail" className="pt-20 pb-2 min-h-[calc(100vh-4rem-3rem)]">
          <Outlet />
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <noscript>
          Debes habilitar JavaScript para usar esta aplicación.
        </noscript>
      </body>
    </html>
  );
}


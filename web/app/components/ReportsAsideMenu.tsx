import { NavLink } from "@remix-run/react";

const ReportsAsideMenu = () => {
  return (
    <aside className="w-[18%] min-w-[220px] bg-[#282c34] text-white p-8 fixed h-full">
      <h2 className="text-3xl font-bold mb-8">Reports</h2>
      <nav>
        <ul className="mt-8 space-y-4">
          <li>
            <NavLink
              to="destinations"
              className={({ isActive }) => 
                isActive 
                  ? "block p-4 rounded-lg bg-[#61dafb] text-black text-xl font-semibold"
                  : "block p-4 rounded-lg hover:bg-gray-700 text-xl font-semibold"
              }
            >
              Destinos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="users"
              className={({ isActive }) => 
                isActive 
                  ? "block p-4 rounded-lg bg-[#61dafb] text-black text-xl font-semibold"
                  : "block p-4 rounded-lg hover:bg-gray-700 text-xl font-semibold"
              }
            >
              Usuarios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="preferences"
              className={({ isActive }) => 
                isActive 
                  ? "block p-4 rounded-lg bg-[#61dafb] text-black text-xl font-semibold"
                  : "block p-4 rounded-lg hover:bg-gray-700 text-xl font-semibold"
              }
            >
              Preferencias
            </NavLink>
          </li>
          <li>
            <NavLink
              to="statistics"
              className={({ isActive }) => 
                isActive 
                  ? "block p-4 rounded-lg bg-[#61dafb] text-black text-xl font-semibold"
                  : "block p-4 rounded-lg hover:bg-gray-700 text-xl font-semibold"
              }
            >
              Estadísticas
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ReportsAsideMenu;

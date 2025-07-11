import { PreferenciasLabels } from "../constants/PreferenciasLabels";
import { Preferencia } from "../interfaces/preference";

interface PreferencesTableProps {
  preferenciasData: Preferencia[];
}

export default function PreferencesTable({ preferenciasData }: PreferencesTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-2xl">
      <table className="min-w-full border-collapse bg-white text-xl">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-left text-2xl">
            <th className="px-8 py-6 font-semibold uppercase tracking-wider">Entorno</th>
            <th className="px-8 py-6 font-semibold uppercase tracking-wider">Clima</th>
            <th className="px-8 py-6 font-semibold uppercase tracking-wider">Actividad</th>
            <th className="px-8 py-6 font-semibold uppercase tracking-wider">Alojamiento</th>
            <th className="px-8 py-6 font-semibold uppercase tracking-wider">Tiempo de Viaje</th>
            <th className="px-8 py-6 font-semibold uppercase tracking-wider">Rango de Edad</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-lg">
          {preferenciasData.map((preferencia, i) => (
            <tr 
              key={i} 
              className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition-colors duration-150 ease-in-out`}
            >
              <td className="px-6 py-4 whitespace-nowrap">{PreferenciasLabels[preferencia.entorno as keyof typeof PreferenciasLabels] || preferencia.entorno}</td>
              <td className="px-6 py-4 whitespace-nowrap">{PreferenciasLabels[preferencia.clima as keyof typeof PreferenciasLabels] || preferencia.clima}</td>
              <td className="px-6 py-4 whitespace-nowrap">{PreferenciasLabels[preferencia.actividad as keyof typeof PreferenciasLabels] || preferencia.actividad}</td>
              <td className="px-6 py-4 whitespace-nowrap">{PreferenciasLabels[preferencia.alojamiento as keyof typeof PreferenciasLabels] || preferencia.alojamiento}</td>
              <td className="px-6 py-4 whitespace-nowrap">{PreferenciasLabels[preferencia.tiempoViaje as keyof typeof PreferenciasLabels] || preferencia.tiempoViaje}</td>
              <td className="px-6 py-4 whitespace-nowrap">{PreferenciasLabels[preferencia.rangoEdad as keyof typeof PreferenciasLabels] || preferencia.rangoEdad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
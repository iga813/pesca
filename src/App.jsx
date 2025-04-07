import React, { useEffect, useState } from "react";
import { Sun, Moon, Waves, Clock } from "lucide-react";

const fetchFishingData = async () => {
  return {
    fecha: new Date().toLocaleDateString(),
    clima: "Soleado",
    temperatura: "18ºC",
    vientoVelocidad: "10 km/h",
    vientoDireccion: "NE",
    faseLunar: "Luna creciente",
    probabilidadPesca: "Alta",
    mareas: [
      { hora: "06:12", tipo: "Bajamar" },
      { hora: "12:45", tipo: "Pleamar" },
      { hora: "18:30", tipo: "Bajamar" }
    ],
    mejoresHorasSepia: [
      "Durante subida de marea (entre bajamar y pleamar)",
      "Durante bajada de marea (entre pleamar y bajamar)"
    ],
    mejoresHorasSpinning: [
      "05:30 - Amanecer (spinning)",
      "20:30 - Atardecer (spinning)"
    ]
  };
};

export default function PaginaPescaCantabria() {
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await fetchFishingData();
      setDatos(res);
    };
    cargarDatos();
  }, []);

  if (!datos) return <div className="p-4">Cargando datos...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 font-sans">
      <h1 className="text-3xl font-bold text-center">Pesca en Cantabria - {datos.fecha}</h1>

      <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
        <Sun />
        <div>
          <p className="font-semibold">Clima:</p>
          <p>{datos.clima} - {datos.temperatura}</p>
          <p>Viento: {datos.vientoVelocidad} dirección {datos.vientoDireccion}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
        <Moon />
        <div>
          <p className="font-semibold">Fase Lunar:</p>
          <p>{datos.faseLunar}</p>
          <p>Probabilidad de pesca: {datos.probabilidadPesca}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center space-x-2">
          <Waves />
          <p className="font-semibold">Mareas:</p>
        </div>
        <ul className="mt-2 space-y-1">
          {datos.mareas.map((marea, idx) => (
            <li key={idx}>{marea.hora} - {marea.tipo}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center space-x-2">
          <Clock />
          <p className="font-semibold">Mejores horas para pescar sepia (con caña):</p>
        </div>
        <ul className="mt-2 space-y-1">
          {datos.mejoresHorasSepia.map((hora, idx) => (
            <li key={idx}>{hora}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center space-x-2">
          <Clock />
          <p className="font-semibold">Mejores horas para spinning (truchas y delfines):</p>
        </div>
        <ul className="mt-2 space-y-1">
          {datos.mejoresHorasSpinning.map((hora, idx) => (
            <li key={idx}>{hora}</li>
          ))}
        </ul>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Actualizar datos
        </button>
      </div>
    </div>
  );
}

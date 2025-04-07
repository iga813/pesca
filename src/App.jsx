import React, { useEffect, useState } from "react";
import { Sun, Moon, Waves, Clock, Calendar } from "lucide-react";

const fetchFishingData = async (fecha) => {
  const dia = fecha || new Date().toISOString().split("T")[0];
  return {
    fecha: new Date(dia).toLocaleDateString('es-ES'),
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
  const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
    const hoy = new Date();
    return hoy.toISOString().split("T")[0];
  });

  const manejarCambioFecha = (e) => {
    setFechaSeleccionada(e.target.value);
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await fetchFishingData(fechaSeleccionada);
      setDatos(res);
    };
    cargarDatos();
  }, [fechaSeleccionada]);

  if (!datos) return <div className="p-4">Cargando datos...</div>;

  const obtenerNombreDia = (fechaISO) => {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const fecha = new Date(fechaISO);
  return dias[fecha.getDay()];
};

return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 font-sans">
      <h1 className="text-3xl font-bold text-center">Pesca en Cantabria - {datos.fecha}</h1>
<p className="text-center text-gray-600">{obtenerNombreDia(fechaSeleccionada)}</p>

      <div className="flex justify-center items-center space-x-2">
        <Calendar />
        <label className="font-semibold">Selecciona un día:</label>
        <input
          type="date"
          value={fechaSeleccionada}
          onChange={manejarCambioFecha}
          className="border rounded px-2 py-1"
        />
      </div>

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
          <p className="font-semibold">Mejores horas para spinning (sepia):</p>
        </div>
        <ul className="mt-2 space-y-1">
          {datos.mejoresHorasSpinning.map((hora, idx) => (
            <li key={idx}>{hora}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

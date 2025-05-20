import { useEffect, useState, useRef } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ExportarExcel from "./ExportarExcel";
import { Instrumento } from "../models/Instrumento";
import { getInstrumentos } from "../services/instrumentoService";
import { descargarInstrumentoPDF } from "../services/instrumentoService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement);

interface PedidoPorMes {
  anio: number;
  mes: number;
  cantidad: number;
}

interface PedidoPorInstrumento {
  instrumento: string;
  cantidad: number;
}

const Reportes = () => {
  const [porMes, setPorMes] = useState<PedidoPorMes[]>([]);
  const [porInstrumento, setPorInstrumento] = useState<PedidoPorInstrumento[]>([]);
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState<Instrumento | null>(null);
  const buscadorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/pedidos/reportes/pedidos-por-mes", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(setPorMes)
      .catch((err) => console.error("Error al cargar pedidos por mes:", err));

    fetch("http://localhost:8080/api/pedidos/reportes/pedidos-por-instrumento", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then(setPorInstrumento)
      .catch((err) => console.error("Error al cargar pedidos por instrumento:", err));

    getInstrumentos()
      .then(setInstrumentos)
      .catch(err => console.error("Error al cargar instrumentos:", err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buscadorRef.current && !buscadorRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filtered = instrumentos.filter(inst =>
    inst.instrumento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (id: number) => {
    const inst = instrumentos.find(i => i.id === id) ?? null;
    setInstrumentoSeleccionado(inst);
    setShowDropdown(false);
    setSearchTerm(inst?.instrumento ?? "");
  };

  const barChartData = {
    labels: porMes.map((p) => `${p.mes}/${p.anio}`),
    datasets: [
      {
        label: "Pedidos por mes",
        data: porMes.map((p) => p.cantidad),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const pieChartData = {
    labels: porInstrumento.map((p) => p.instrumento),
    datasets: [
      {
        label: "Pedidos por instrumento",
        data: porInstrumento.map((p) => p.cantidad),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">

      {/* Gráficos lado a lado */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
        className="mb-16" // Aumenta el espacio debajo de los gráficos
      >
        <div style={{ flex: "1 1 600px", height: "400px" }}>
          <h2 className="text-xl font-bold mb-8 text-center">Pedidos por Mes/Año</h2>
          <Bar data={barChartData} options={chartOptions} />
        </div>
        <div style={{ flex: "1 1 400px", height: "400px" }}>
          <h2 className="text-xl font-bold mb-8 text-center">Pedidos por Instrumento</h2>
          <Pie data={pieChartData} options={chartOptions} />
        </div>
      </div>

      {/* Exportar Excel */}
      <div className="flex justify-center mt-32 mb-12">
        <ExportarExcel />
      </div>

      {/* Buscador y Detalle instrumento en fila */}
      <div className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto mt-8 mb-8">
        {/* Buscador */}
        <div className="w-full md:w-1/3">
          <div className="relative" ref={buscadorRef}>
            <input
              type="text"
              placeholder="Buscar instrumento..."
              value={searchTerm}
              onFocus={() => setShowDropdown(true)}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {showDropdown && (
              <ul className="absolute z-10 max-h-60 overflow-auto w-full bg-white border border-gray-300 rounded-b-md shadow-lg">
                {filtered.length > 0 ? filtered.map(inst => (
                  <li
                    key={inst.id}
                    className="cursor-pointer p-2 hover:bg-gray-200"
                    onClick={() => handleSelect(inst.id!)}
                  >
                    {inst.instrumento}
                  </li>
                )) : (
                  <li className="p-2 text-gray-500">No hay resultados</li>
                )}
              </ul>
            )}
          </div>
        </div>

        {/* Card de instrumento */}
        <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg overflow-hidden p-6">
          {instrumentoSeleccionado ? (
            <>
              <img
                src={`/img/${instrumentoSeleccionado.imagen}`}
                alt={instrumentoSeleccionado.instrumento}
                className="w-full h-60 object-contain mb-4"
              />
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {instrumentoSeleccionado.instrumento}
                </h2>
                <p className="text-3xl mt-2">
                  ${parseFloat(instrumentoSeleccionado.precio.toString()).toLocaleString()}
                </p>
                {instrumentoSeleccionado.costoEnvio === 'G' ? (
                  <div className="flex items-center gap-2 text-green-600 mt-2">
                    {/* Icono camión */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icon icon-tabler icon-tabler-truck"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="7" cy="17" r="2" />
                      <circle cx="17" cy="17" r="2" />
                      <path d="M5 17h-2v-11a1 1 0 0 1 1-1h9v12m-4 0h6m4 0h2v-6h-8m0-5h5l3 5" />
                    </svg>
                    Envío gratis a todo el país
                  </div>
                ) : (
                  <p className="text-orange-600 mt-2">
                    Costo de Envío Interior de Argentina: ${instrumentoSeleccionado.costoEnvio}
                  </p>
                )}
                <p className="text-sm text-gray-600 mt-2">
                  {instrumentoSeleccionado.cantidadVendida} vendidos
                </p>
                <div className="mt-2">
                  <span className="font-semibold">Marca:</span> {instrumentoSeleccionado.marca}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Modelo:</span> {instrumentoSeleccionado.modelo}
                </div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold mb-1">Descripción:</h3>
                  <p className="text-gray-700 text-sm whitespace-pre-line">{instrumentoSeleccionado.descripcion}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <button
                  className="mt-4 px-4 py-2 border border-purple-600 text-purple-700 rounded hover:bg-purple-100 transition"
                  onClick={() => descargarInstrumentoPDF(instrumentoSeleccionado.id!)}
                >
                  Descargar PDF
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Seleccione un instrumento para ver detalles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reportes;

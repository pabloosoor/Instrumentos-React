import { useEffect, useState } from "react";
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
  }, []);

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
    <div style={{ padding: "2rem" }}>
      {/* Selector de fechas y botón exportar */}
      <ExportarExcel />

      {/* Gráficos lado a lado */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 600px", height: "400px" }}>
          <h2 className="text-xl font-bold mb-4 text-center">Pedidos por Mes/Año</h2>
          <Bar data={barChartData} options={chartOptions} />
        </div>
        <div style={{ flex: "1 1 400px", height: "400px" }}>
          <h2 className="text-xl font-bold mb-4 text-center">Pedidos por Instrumento</h2>
          <Pie data={pieChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Reportes;

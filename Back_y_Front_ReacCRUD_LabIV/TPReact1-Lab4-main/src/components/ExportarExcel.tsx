import { useState } from "react";

const ExportarExcel = () => {
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const handleExportar = async () => {
    if (!desde || !hasta) {
      alert("Seleccioná ambas fechas.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/pedidos/exportar-excel?desde=${desde}&hasta=${hasta}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "pedidos.xlsx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error al exportar:", err);
      alert("Ocurrió un error al exportar el Excel.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-8 text-center border-2 border-green-600">
      <h2 className="text-lg font-semibold mb-4">Exportar pedidos a Excel</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div>
          <label className="font-medium mr-2">Desde:</label>
          <input
            type="date"
            value={desde}
            onChange={(e) => setDesde(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <div>
          <label className="font-medium mr-2">Hasta:</label>
          <input
            type="date"
            value={hasta}
            onChange={(e) => setHasta(e.target.value)}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={handleExportar}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Exportar
        </button>
      </div>
    </div>
  );
};

export default ExportarExcel;

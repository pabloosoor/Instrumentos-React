import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInstrumentoById } from '../services/instrumentoService';
import { Instrumento } from '../models/Instrumento';
import { useCarrito } from '../hooks/UseCarrito';

function DetalleInstrumento() {
  const { id } = useParams();
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null);
  const { addCarrito } = useCarrito();
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    getInstrumentoById(id as string)
      .then(data => setInstrumento(data))
      .catch(error => console.error('Error al cargar los datos:', error));
  }, [id]);

  const handleAgregar = () => {
    if (instrumento) {
      addCarrito(instrumento);
      setAgregado(true);
      setTimeout(() => setAgregado(false), 1500);
    }
  };

  if (!instrumento) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4">
      {/* Columna Izquierda: Imagen y Descripción */}
      <div className="md:w-2/3 flex flex-col items-center">
        <img
          src={`/img/${instrumento.imagen}`}
          alt={instrumento.instrumento}
          className="w-full max-w-xl h-64 object-contain mb-4 rounded-lg"
        />
        <div className="mt-4 w-full">
          <h2 className="text-lg font-semibold mb-2">Descripción:</h2>
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {instrumento.descripcion}
          </p>
        </div>
      </div>
      {/* Columna Derecha: Info principal */}
      <div className="md:w-1/3 flex flex-col justify-start border-l border-gray-300 pl-4">
        <p className="text-sm text-gray-500 mb-1">
          {instrumento.cantidadVendida} vendidos
        </p>
        <h1 className="text-2xl font-bold mb-2">{instrumento.instrumento}</h1>
        <p className="text-3xl mb-2">
          $ {parseFloat(instrumento.precio.toString()).toLocaleString()}
        </p>
        <div className="mb-0 pb-0">
          <span className="font-semibold">Marca:</span> {instrumento.marca}
        </div>
        <div className="mb-2">
          <span className="font-semibold">Modelo:</span> {instrumento.modelo}
        </div>
        <div className="mb-4 flex flex-col">
          <span className="font-semibold">Costo Envío:</span>{' '}
          {instrumento.costoEnvio === 'G' ? (
            <span className="text-green-600 flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block align-middle">
                <path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                />
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
              </svg>
              Envío gratis
            </span>
          ) : (
            <span className="text-orange-600">${instrumento.costoEnvio}</span>
          )}
        </div>
        <button
          className={`mt-4 px-4 py-2 max-w-[200px] border border-blue-400 text-blue-600 rounded hover:bg-blue-50 transition ${agregado ? 'bg-green-100 border-green-400 text-green-700 scale-105' : ''}`}
          onClick={handleAgregar}
          disabled={agregado}
        >
          {agregado ? '¡Agregado!' : 'Agregar al carrito'}
        </button>
        {agregado && (
          <span className="text-green-600 mt-2 animate-pulse">Producto añadido al carrito</span>
        )}
      </div>
    </div>
  );
}

export default DetalleInstrumento;

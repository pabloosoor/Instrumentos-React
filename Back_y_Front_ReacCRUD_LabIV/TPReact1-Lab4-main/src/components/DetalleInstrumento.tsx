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
    <div className="flex justify-center p-4">
      <div className="w-96 flex flex-col item-container bg-white shadow-lg rounded-lg overflow-hidden p-3 transition-transform duration-300">
        <img
          src={`/img/${instrumento.imagen}`}
          alt={instrumento.instrumento}
          className="item-image w-full h-60 object-contain mb-4"
        />
        <div className="item-info">
          <h2 className="item-title text-2xl font-semibold text-gray-800">
            {instrumento.instrumento}
          </h2>
          <p className="item-price text-3xl mt-2">
            ${parseFloat(instrumento.precio.toString()).toLocaleString()}
          </p>
          {instrumento.costoEnvio === 'G' ? (
            <div className="item-envio gratis flex items-center gap-2 text-green-600 mt-2">
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-truck">
                <path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                />
                <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
              </svg>
              Envío gratis a todo el país
            </div>
          ) : (
            <p className="item-envio precio text-orange-600 mt-2">
              Costo de Envío Interior de Argentina: ${instrumento.costoEnvio}
            </p>
          )}
          <p className="item-vendidos text-sm text-gray-600 mt-2">
            {instrumento.cantidadVendida} vendidos
          </p>
          <div className="mt-2">
            <span className="font-semibold">Marca:</span> {instrumento.marca}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Modelo:</span> {instrumento.modelo}
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-1">Descripción:</h3>
            <p className="text-gray-700 text-sm whitespace-pre-line">
              {instrumento.descripcion}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <button
            className={`mt-2 px-4 py-2 border border-blue-400 text-blue-600 rounded hover:bg-blue-50 transition ${agregado ? 'bg-green-100 border-green-400 text-green-700 scale-105' : ''}`}
            onClick={handleAgregar}
            disabled={agregado}
          >
            {agregado ? '¡Agregado!' : 'Añadir al carrito'}
          </button>
          {agregado && (
            <span className="text-green-600 mt-2 animate-pulse">Producto añadido al carrito</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleInstrumento;

import { Link } from 'react-router-dom';
import { Instrumento } from '../models/Instrumento';
import { useCarrito } from '../hooks/UseCarrito';

function InstrumentoCard({
  instrumento,
}: {
  readonly instrumento: Instrumento;
}) {
  const { addCarrito } = useCarrito();

  return (
    <div className="w-72 flex flex-col item-container bg-white shadow-lg rounded-lg overflow-hidden p-3 transition-transform duration-300 hover:scale-105">
      <Link to={`/detalle/${instrumento.id}`} className="flex-1">
        <img
          src={`/img/${instrumento.imagen}`}
          alt={instrumento.instrumento}
          className="flex-1/3 item-image w-full h-60 object-contain mb-4"
        />
        <div className="flex-2/3 item-info">
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
        </div>
      </Link>
      <div className="flex flex-col justify-center">
        <button
          className="mt-2 px-4 py-2 border border-blue-400 text-blue-600 rounded hover:bg-blue-50 transition"
          onClick={() => addCarrito(instrumento)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default InstrumentoCard;

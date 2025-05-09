import React, { useState } from 'react';
import { useCarrito } from '../hooks/UseCarrito';

const Carrito: React.FC = () => {
  const { carrito, addCarrito, removeCarrito, removeItemCarrito, limpiarCarrito } = useCarrito();
  const [guardando, setGuardando] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; mensaje: string }>({ open: false, mensaje: '' });
  const [error, setError] = useState<string | null>(null);

  const total = carrito.reduce(
    (acc, item) => acc + item.instrumento.precio * item.cantidad,
    0
  );

  const handleGuardarCarrito = async () => {
    setGuardando(true);
    setError(null);
    const pedido = {
      fechaPedido: new Date().toISOString(),
      totalPedido: total,
      detalles: carrito.map(item => ({
        cantidad: item.cantidad,
        instrumento: { id: item.instrumento.id }
      }))
    };
    try {
      const response = await fetch('http://localhost:8080/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedido)
      });
      if (!response.ok) throw new Error('Error al guardar el pedido');
      const mensaje = await response.text();
      setModal({ open: true, mensaje });
      limpiarCarrito();
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Carrito de Instrumentos</h2>
      {carrito.length === 0 ? (
        <p className="text-center text-gray-500">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {carrito.map(item => (
              <li key={item.instrumento.id} className="flex items-center py-4 gap-4">
                <img
                  src={`/img/${item.instrumento.imagen}`}
                  alt={item.instrumento.instrumento}
                  className="w-20 h-20 object-contain rounded border"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.instrumento.instrumento}</h3>
                  <p className="text-gray-500 text-sm">{item.instrumento.marca} - {item.instrumento.modelo}</p>
                  <p className="text-blue-700 font-bold mt-1">${item.instrumento.precio.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm mt-1">Subtotal: <span className="font-semibold">${(item.instrumento.precio * item.cantidad).toLocaleString()}</span></p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeItemCarrito(item.instrumento.id)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold flex items-center justify-center transition"
                      title="Disminuir cantidad"
                    >
                      -
                    </button>
                    <span className="px-2 text-lg font-semibold">{item.cantidad}</span>
                    <button
                      onClick={() => addCarrito(item.instrumento)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold flex items-center justify-center transition"
                      title="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeCarrito(item.instrumento.id)}
                    className="text-red-600 hover:text-red-800 text-xs mt-2 underline"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            <button
              onClick={limpiarCarrito}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
            >
              Limpiar carrito
            </button>
            <div className="text-2xl font-bold text-blue-700">
              Total: ${total.toLocaleString()}
            </div>
            <button
              onClick={handleGuardarCarrito}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-2 rounded-lg font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={guardando}
            >
              {guardando ? 'Guardando...' : 'Guardar Carrito'}
            </button>
          </div>
          {error && <div className="text-red-600 text-center mt-4">{error}</div>}
        </>
      )}
      {/* Modal de éxito */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-4">¡Pedido guardado!</h2>
            <p className="text-gray-700 mb-6">{modal.mensaje}</p>
            <button
              onClick={() => setModal({ open: false, mensaje: '' })}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito; 
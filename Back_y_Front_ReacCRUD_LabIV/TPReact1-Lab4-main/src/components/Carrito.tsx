import React, { useState } from 'react';
import { useCarrito } from '../hooks/UseCarrito';
import MercadoPagoButton from './MercadoPagoButton';
import { Pedido } from '../models/Pedido';

const Carrito: React.FC = () => {
  const { carrito, addCarrito, removeCarrito, removeItemCarrito, limpiarCarrito } = useCarrito();
  const [guardando, setGuardando] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; mensaje: string }>({ open: false, mensaje: '' });
  const [error, setError] = useState<string | null>(null);
  const [pedidoGuardado, setPedidoGuardado] = useState<Pedido | null>(null);
  const [mostrarPago, setMostrarPago] = useState(false);

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
      const pedidoResponse = await response.json();
      setPedidoGuardado(pedidoResponse);
      setModal({ 
        open: true, 
        mensaje: '' // El mensaje se genera en el modal con los datos del pedido
      });
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setGuardando(false);
    }
  };

  const handlePagoSuccess = () => {
    limpiarCarrito();
  };

  const handlePagoError = (err: any) => {
    setError(`Error en el pago: ${err.message || 'Error desconocido'}`);
  };

  const handleCerrarModal = () => {
    setModal({ open: false, mensaje: '' });
    setMostrarPago(true);
  };

  if (carrito.length === 0 && !mostrarPago) {
    return (
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Carrito de Instrumentos</h2>
        <p className="text-center text-gray-500 mb-4">El carrito está vacío.</p>
        <div className="flex justify-center">
          <a 
            href="/productos" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Ver productos
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Carrito de Instrumentos</h2>
      
      {/* Modal de éxito visual y claro */}
      {modal.open && pedidoGuardado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">¡Pedido guardado correctamente!</h2>
              <p className="text-gray-700 mb-2">
                Tu pedido ha sido registrado con el número: <span className="font-bold">#{pedidoGuardado.id}</span>
              </p>
              <p className="text-gray-700 mb-6">
                Total a pagar: <span className="font-bold">${pedidoGuardado.totalPedido?.toLocaleString()}</span>
              </p>
              <button
                onClick={handleCerrarModal}
                className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700"
              >
                Continuar al pago
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pantalla de pago con resumen y botón MercadoPago */}
      {mostrarPago && pedidoGuardado ? (
        <div className="flex flex-col items-center">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 w-full">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Resumen de tu pedido</h3>
            <p className="text-green-700 mb-2">Pedido N° <span className="font-bold">#{pedidoGuardado.id}</span></p>
            <p className="text-gray-700 mb-4">Total a pagar: <span className="font-bold">${pedidoGuardado.totalPedido?.toLocaleString()}</span></p>
            <div className="mt-4">
              <MercadoPagoButton 
                pedido={pedidoGuardado}
                onSuccess={handlePagoSuccess}
                onError={handlePagoError}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <button
              onClick={() => {
                setMostrarPago(false);
                setPedidoGuardado(null);
                setModal({ open: false, mensaje: '' });
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition"
            >
              Volver al carrito
            </button>
            <button
              onClick={() => {
                window.location.href = '/';
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Seguir comprando
            </button>
          </div>
        </div>
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
                <div className="flex flex-col items-center">
                  <div className="flex items-center border rounded-md my-1">
                    <button
                      onClick={() => removeItemCarrito(item.instrumento.id)}
                      className="px-3 py-1 text-red-500 hover:bg-red-50 transition"
                      aria-label="Reducir cantidad"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{item.cantidad}</span>
                    <button
                      onClick={() => addCarrito(item.instrumento)}
                      className="px-3 py-1 text-green-500 hover:bg-green-50 transition"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeCarrito(item.instrumento.id)}
                    className="text-red-500 hover:text-red-700 text-sm transition"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 border-t pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
              <button
                onClick={limpiarCarrito}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold transition w-full sm:w-auto"
              >
                Limpiar carrito
              </button>
              <div className="text-2xl font-bold text-blue-700">
                Total: ${total.toLocaleString()}
              </div>
            </div>
            <button
              onClick={handleGuardarCarrito}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-8 rounded-lg font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={guardando}
            >
              {guardando ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  <span>Guardando pedido...</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Finalizar compra</span>
                </div>
              )}
            </button>
            {error && (
              <div className="text-red-600 text-center mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito; 
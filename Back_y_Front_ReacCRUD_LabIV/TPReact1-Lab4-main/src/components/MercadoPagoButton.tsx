import React, { useState } from 'react';
import { Pedido } from '../models/Pedido';
import MercadoPagoService from '../services/MercadoPagoService';

interface MercadoPagoButtonProps {
  pedido: Pedido;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

const MercadoPagoButton: React.FC<MercadoPagoButtonProps> = ({ 
  pedido, 
  onSuccess, 
  onError 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePagoClick = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Obtener preferencia de pago
      const preferencia = await MercadoPagoService.crearPreferencia(pedido);
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirigir al usuario a la página de pago de MercadoPago
      window.location.href = preferencia.initPoint;
      
    } catch (err: any) {
      console.error('Error al procesar pago:', err);
      const errorMsg = err.message || 'Error al procesar el pago';
      setError(errorMsg);
      setLoading(false);
      
      if (onError) {
        onError(err);
      }
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handlePagoClick}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        style={{ background: loading ? '#009ee3' : '#009ee3' }}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            <span>Conectando con Mercado Pago...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="mr-2">Pagar con Mercado Pago</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
              <line x1="1" y1="10" x2="23" y2="10"></line>
            </svg>
          </div>
        )}
      </button>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default MercadoPagoButton; 
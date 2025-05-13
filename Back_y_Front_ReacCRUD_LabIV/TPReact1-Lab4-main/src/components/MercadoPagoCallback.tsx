import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MercadoPagoService from '../services/MercadoPagoService';

const MercadoPagoCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'success' | 'pending' | 'failure' | 'loading'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const processPaymentResult = async () => {
      // Obtenemos los parámetros que envía Mercado Pago en la URL
      const paymentId = searchParams.get('payment_id');
      const status = searchParams.get('status');
      const merchantOrderId = searchParams.get('merchant_order_id');
      const externalReference = searchParams.get('external_reference');

      if (!paymentId || !status) {
        setStatus('failure');
        setMessage('No se pudo completar la operación. Faltan datos de pago.');
        return;
      }

      try {
        // Si necesitas verificar el estado del pago con tu backend
        if (status === 'approved') {
          setStatus('success');
          setMessage('¡Pago completado con éxito! Tu pedido ha sido procesado.');
        } else if (status === 'pending') {
          setStatus('pending');
          setMessage('El pago está pendiente de confirmación.');
        } else {
          setStatus('failure');
          setMessage('El pago no pudo completarse. Por favor, intenta de nuevo.');
        }

        // Registrar en el backend, si es necesario
        // await MercadoPagoService.verificarPago(paymentId);
        
        // Redirigir después de 3 segundos
        setTimeout(() => {
          navigate('/');
        }, 3000);
      } catch (error) {
        console.error('Error al procesar resultado de pago:', error);
        setStatus('failure');
        setMessage('Ocurrió un error al procesar el resultado del pago.');
      }
    };

    processPaymentResult();
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {status === 'loading' && (
          <>
            <h2 className="text-xl font-semibold text-center mb-4">Procesando tu pago...</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-green-600 mb-2">¡Pago exitoso!</h2>
            <p className="text-center text-gray-600 mb-4">{message}</p>
          </>
        )}
        
        {status === 'pending' && (
          <>
            <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-yellow-600 mb-2">Pago en proceso</h2>
            <p className="text-center text-gray-600 mb-4">{message}</p>
          </>
        )}
        
        {status === 'failure' && (
          <>
            <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-center text-red-600 mb-2">Error en el pago</h2>
            <p className="text-center text-gray-600 mb-4">{message}</p>
          </>
        )}
        
        <p className="text-center text-gray-500 text-sm mt-4">
          Serás redirigido automáticamente en unos segundos...
        </p>
      </div>
    </div>
  );
};

export default MercadoPagoCallback; 
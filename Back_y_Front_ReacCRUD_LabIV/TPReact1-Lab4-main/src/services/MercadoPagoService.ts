import axios from 'axios';
import { Pedido } from '../models/Pedido';

const API_URL = 'http://localhost:8080/api/mercadopago';

export default {
  /**
   * Crea una preferencia de pago en Mercado Pago
   * @param pedido El pedido a pagar
   * @returns Un objeto con el ID de preferencia y la URL de pago
   */
  async crearPreferencia(pedido: Pedido) {
    try {
      const response = await axios.post(`${API_URL}/crear-preferencia`, pedido);
      return response.data;
    } catch (error) {
      console.error('Error al crear preferencia de pago:', error);
      throw error;
    }
  },

  /**
   * Genera una URL de pago directa para el pedido
   * @param pedido El pedido a pagar
   * @returns La URL de pago de Mercado Pago
   */
  async generarPago(pedido: Pedido) {
    try {
      const response = await axios.post(`${API_URL}/pagar`, pedido);
      return response.data;
    } catch (error) {
      console.error('Error al generar pago:', error);
      throw error;
    }
  },
  
  /**
   * Verifica el estado de un pago
   * @param paymentId ID del pago en Mercado Pago
   * @returns Información sobre el estado del pago
   */
  async verificarPago(paymentId: string) {
    try {
      const response = await axios.get(`${API_URL}/payment/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Error al verificar estado del pago:', error);
      throw error;
    }
  }
} 
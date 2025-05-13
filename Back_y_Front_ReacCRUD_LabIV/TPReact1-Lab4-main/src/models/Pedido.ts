import { Instrumento } from './Instrumento';

/**
 * Modelo de detalle de pedido
 */
export interface DetallePedido {
  id?: number;
  cantidad: number;
  instrumento: Instrumento | { id: number };
}

/**
 * Modelo que representa un pedido completo
 */
export class Pedido {
  id?: number;
  fechaPedido: string;
  totalPedido: number;
  estado?: string;
  detalles: DetallePedido[];

  constructor(data: Partial<Pedido>) {
    this.id = data.id;
    this.fechaPedido = data.fechaPedido || new Date().toISOString();
    this.totalPedido = data.totalPedido || 0;
    this.estado = data.estado || 'PENDIENTE';
    this.detalles = data.detalles || [];
  }
} 
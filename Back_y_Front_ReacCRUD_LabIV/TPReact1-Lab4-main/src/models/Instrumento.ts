import { Categoria } from './Categoria';

export class Instrumento {
  id: number;
  instrumento: string;
  marca: string;
  modelo: string;
  imagen: string;
  precio: number;
  costoEnvio: string;
  cantidadVendida: number;
  descripcion: string;
  categoria: Categoria;

  constructor(data: Instrumento) {
    this.id = data.id;
    this.instrumento = data.instrumento;
    this.marca = data.marca;
    this.modelo = data.modelo;
    this.imagen = data.imagen;
    this.precio = data.precio;
    this.costoEnvio = data.costoEnvio;
    this.cantidadVendida = data.cantidadVendida;
    this.descripcion = data.descripcion;
    this.categoria = new Categoria(data.categoria);
  }
}

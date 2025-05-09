export class Categoria {
  id: number;
  nombre: string;

  constructor(data: Categoria) {
    this.id = data.id;
    this.nombre = data.nombre;
  }
}

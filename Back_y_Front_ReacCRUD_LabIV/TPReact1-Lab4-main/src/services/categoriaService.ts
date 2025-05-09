import { Categoria } from '../models/Categoria';

const API_URL = import.meta.env.VITE_API_URL;
console.log('✅ VITE_API_URL:', import.meta.env.VITE_API_URL);

export async function getCategorias(): Promise<Categoria[]> {
  const res = await fetch(`${API_URL}/api/categoria`);
  if (!res.ok) throw new Error('Error al obtener categorías');
  const data = await res.json();
  const items = Array.isArray(data.data) ? data.data : data;
  return items.map((item: Categoria) => new Categoria(item));
}

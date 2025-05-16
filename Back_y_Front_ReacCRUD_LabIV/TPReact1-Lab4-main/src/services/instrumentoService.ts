// Centraliza los llamados a la API de instrumentos
import { Instrumento } from '../models/Instrumento';

const API_URL = import.meta.env.VITE_API_URL;
console.log('✅ VITE_API_URL:', import.meta.env.VITE_API_URL);



export async function getInstrumentos(): Promise<Instrumento[]> {
  const res = await fetch(`${API_URL}/api/instrumentos`, { credentials: 'include' });
  if (!res.ok) throw new Error('Error al obtener instrumentos');
  const data = await res.json();
  // Si el backend devuelve { data: [...] }
  const items = Array.isArray(data.data) ? data.data : data;
  return items.map((item: Instrumento) => new Instrumento(item));
}

export async function getInstrumentoById(id: string): Promise<Instrumento> {
  const res = await fetch(`${API_URL}/api/instrumentos/${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Instrumento no encontrado');
  const data = await res.json();
  // Si el backend devuelve { data: {...} }
  const item = data.data ?? data;
  return new Instrumento(item);
}

// NUEVA función para descargar PDF
export async function descargarInstrumentoPDF(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/api/instrumentos/pdf/${id}`, {
    method: 'GET',
    credentials: 'include', // Envía cookies para autenticación
  });

  if (!res.ok) {
    throw new Error('Error al descargar el PDF');
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `instrumento_${id}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
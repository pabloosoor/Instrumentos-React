import { useEffect, useState } from 'react';
//import InstrumentoList from './InstrumentoList';
import { getInstrumentos } from '../services/instrumentoService';
import { getCategorias } from '../services/categoriaService';
import { Instrumento } from '../models/Instrumento';
import { Categoria } from '../models/Categoria';
import InstrumentoCard from './InstrumentoCard';

function Productos() {
  const [filtro, setFiltro] = useState('');
  const [orden, setOrden] = useState('precio');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<
    number | ''
  >('');
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    getInstrumentos()
      .then(data => {
        setInstrumentos(data);
      })
      .catch(error => {
        console.error('Error obteniendo instrumentos:', error);
      });
    getCategorias()
      .then(data => {
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error obteniendo categorias:', error);
      });
  }, []);

  const instrumentosFiltrados = instrumentos.filter(
    inst =>
      (categoriaSeleccionada === '' ||
        (inst.categoria && inst.categoria.id === categoriaSeleccionada)) &&
      inst.instrumento?.toLowerCase().includes(filtro.toLowerCase())
  );

  const instrumentosOrdenados = [...instrumentosFiltrados].sort((a, b) => {
    if (orden === 'precio') return a.precio - b.precio;
    if (orden === 'vendidos')
      return Number(b.cantidadVendida) - Number(a.cantidadVendida);
    return a.instrumento.localeCompare(b.instrumento);
  });

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Productos</h1>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Buscar instrumento..."
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            className="w-96 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-4">
          <select
            value={categoriaSeleccionada}
            onChange={e =>
              setCategoriaSeleccionada(
                e.target.value === '' ? '' : Number(e.target.value)
              )
            }
            className="p-2 border border-gray-300 rounded w-64"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(cat => (
              <option
                key={cat.id}
                value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          <select
            value={orden}
            onChange={e => setOrden(e.target.value)}
            className="p-2 border border-gray-300 rounded w-64"
          >
            <option value="precio">Precio</option>
            <option value="vendidos">Más vendidos</option>
            <option value="nombre">Nombre</option>
          </select>
        </div>
        {instrumentosOrdenados.length > 0 ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {instrumentosOrdenados.map(instr => (
              <InstrumentoCard key={instr.id} instrumento={instr} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No se encontraron resultados.
          </p>
        )}
      </div>
    </div>
  );
}

export default Productos;

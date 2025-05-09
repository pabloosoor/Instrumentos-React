import { Instrumento } from '../../models/Instrumento';
import { Categoria } from '../../models/Categoria';

export const instrumentTableConfig = {
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'instrumento', label: 'Instrumento' },
    { key: 'marca', label: 'Marca' },
    { key: 'modelo', label: 'Modelo' },
    { key: 'precio', label: 'Precio', render: (row: Instrumento) => `$${row.precio}` },
    {
      key: 'categoria',
      label: 'Categoría',
      render: (row: Instrumento) => row.categoria?.nombre ?? 'Sin categoría'
    },
  ],
};

export const instrumentFormConfig: Array<{
  key: keyof Instrumento | string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: { label: string; value: Categoria['id'] }[];
  required?: boolean;
}> = [
  { key: 'instrumento', label: 'Instrumento', type: 'text', required: true },
  { key: 'marca', label: 'Marca', type: 'text', required: true },
  { key: 'modelo', label: 'Modelo', type: 'text', required: true },
  { key: 'precio', label: 'Precio', type: 'number', required: true },
  { key: 'categoria', label: 'Categoría', type: 'select', options: [], required: true },
];
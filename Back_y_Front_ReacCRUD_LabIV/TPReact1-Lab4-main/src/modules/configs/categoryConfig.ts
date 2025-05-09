import { Categoria } from '../../models/Categoria';

export const categoryTableConfig = {
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'nombre', label: 'Nombre' },
  ] as Array<{ key: keyof Categoria; label: string }>,
};

export const categoryFormConfig: Array<{
  key: keyof Categoria;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: { label: string; value: Categoria['id'] }[];
  required?: boolean;
}> = [
  { key: 'nombre', label: 'Nombre', type: 'text', required: true },
];

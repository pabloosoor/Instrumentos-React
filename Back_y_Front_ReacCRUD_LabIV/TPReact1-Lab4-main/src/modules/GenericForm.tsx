import { useEffect, useState } from 'react';

export interface FieldConfig<T> {
  key: keyof T | string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: { label: string; value: T[keyof T] }[];
  required?: boolean;
}

interface GenericFormProps<T> {
  fields: FieldConfig<T>[];
  initialValues?: Partial<T>;
  open: boolean;
  onSave: (values: Partial<T>) => void;
  onCancel: () => void;
  loading?: boolean;
  title?: string;
}

export function GenericForm<T>({
  fields,
  initialValues = {},
  open,
  onSave,
  onCancel,
  loading = false,
  title = 'Formulario',
}: GenericFormProps<T>) {
  const [values, setValues] = useState<Partial<T>>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues, open]);

  if (!open) return null;
  console.log('genericForm abierto')

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl relative">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <form
          className="grid grid-cols-3 gap-4"
          onSubmit={e => {
            e.preventDefault();
            onSave(values);
          }}
        >
          {fields.map(field => (
            <div key={field.key as string} className="col-span-1 flex flex-col">
              <label className="mb-2 font-medium">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  value={values[field.key as keyof T] !== undefined ? String(values[field.key as keyof T]) : ''}
                  onChange={e => setValues({ ...values, [field.key]: e.target.value })}
                  required={field.required}
                  className="border rounded px-2 py-1"
                >
                  <option value="">Selecciona una opción</option>
                  {field.options?.map(opt => (
                    <option key={String(opt.value)} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={values[field.key as keyof T] !== undefined ? String(values[field.key as keyof T]) : ''}
                  onChange={e => setValues({ ...values, [field.key]: e.target.value })}
                  required={field.required}
                  className="border rounded px-2 py-1"
                />
              )}
            </div>
          ))}
          <div className="col-span-3 flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-400"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-pink-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-pink-700"
              disabled={loading}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

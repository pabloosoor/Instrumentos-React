import { useEffect, useState } from 'react';
import { GenericTable } from '../GenericTable';
import { GenericForm, FieldConfig } from '../GenericForm';
import { instrumentTableConfig, instrumentFormConfig } from '../configs/instrumentConfig';
import { Instrumento } from '../../models/Instrumento';
import { Categoria } from '../../models/Categoria';

export function InstrumentsCrud() {
  const [instruments, setInstruments] = useState<Instrumento[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Instrumento | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8080/api/instrumentos').then(res => res.json()),
      fetch('http://localhost:8080/api/categoria').then(res => res.json())
    ]).then(([inst, cats]: [Instrumento[], Categoria[]]) => {
      setInstruments(inst);
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  const handleSave = (values: Partial<Instrumento>) => {
    setLoading(true);
    if (typeof values.categoria === 'string' || typeof values.categoria === 'number') {
      values.categoria = categories.find((cat: Categoria) => cat.id === Number(values.categoria));
    }
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `http://localhost:8080/api/instrumentos/${editing.id}` : 'http://localhost:8080/api/instrumentos';
    console.log('POST o PUT enviado:', values);
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(res => res.json())
      .then(() => {
        setShowForm(false);
        setEditing(null);
        return fetch('http://localhost:8080/api/instrumentos')
          .then(res => res.json())
          .then((data: Instrumento[]) => setInstruments(data));
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (row: Instrumento) => {
    setLoading(true);
    fetch(`http://localhost:8080/api/instrumentos/${row.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })    
      .then(() => fetch('http://localhost:8080/api/instrumentos'))
      .then(res => res.json())
      .then((data: Instrumento[]) => setInstruments(data))
      .finally(() => setLoading(false));
  };

  const formConfig: FieldConfig<Instrumento>[] = instrumentFormConfig.map(field =>
    field.key === 'categoria'
      ? { ...field, options: categories.map((cat: Categoria) => ({ label: cat.nombre, value: cat.id })) }
      : field
  );

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Instrumentos</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700"
        >
          Nuevo Instrumento
        </button>
      </div>
      <GenericTable<Instrumento>
        columns={instrumentTableConfig.columns}
        data={instruments}
        onEdit={row => { setEditing(row); setShowForm(true); }}
        onDelete={handleDelete}
        loading={loading}
      />
      <GenericForm<Instrumento>
        fields={formConfig}
        initialValues={
          editing
            ? { ...editing, categoria: editing.categoria?.id ?? '' }
            : {}
        }
        open={showForm}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditing(null); }}
        loading={loading}
        title={editing ? 'Editar Instrumento' : 'Nuevo Instrumento'}
      />
    </div>
  );
}
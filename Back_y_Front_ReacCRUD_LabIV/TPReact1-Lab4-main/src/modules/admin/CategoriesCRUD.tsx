import { useEffect, useState } from 'react';
import { GenericTable } from '../GenericTable';
import { GenericForm } from '../GenericForm';
import { categoryTableConfig, categoryFormConfig } from '../configs/categoryConfig';
import { Categoria } from '../../models/Categoria';

export function CategoriesCrud() {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/categoria')
      .then(res => res.json())
      .then((data: Categoria[]) => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  const handleSave = (values: Partial<Categoria>) => {
    setLoading(true);
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `http://localhost:8080/api/categoria/${editing.id}` : 'http://localhost:8080/api/categoria';
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
        return fetch('http://localhost:8080/api/categoria')
          .then(res => res.json())
          .then((data: Categoria[]) => setCategories(data));
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (row: Categoria) => {
    setLoading(true);
    fetch(`http://localhost:8080/api/categoria/${row.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("No se pudo eliminar la categoría. Puede tener instrumentos asociados.");
        }
        return fetch('http://localhost:8080/api/categoria');
      })
      .then(res => res.json())
      .then((data: Categoria[]) => setCategories(data))
      .catch(err => {
        setErrorMessage(err.message);
        setShowErrorModal(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categorías</h1>
        <button
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700"
        >
          Nueva Categoría
        </button>
      </div>

      <GenericTable<Categoria>
        columns={categoryTableConfig.columns}
        data={categories}
        onEdit={row => { setEditing(row); setShowForm(true); }}
        onDelete={handleDelete}
        loading={loading}
      />

      <GenericForm<Categoria>
        fields={categoryFormConfig}
        initialValues={editing || {}}
        open={showForm}
        onSave={handleSave}
        onCancel={() => { setShowForm(false); setEditing(null); }}
        loading={loading}
        title={editing ? 'Editar Categoría' : 'Nueva Categoría'}
      />

      {/* Modal de error */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">No se puede eliminar</h2>
            <p className="text-gray-700 mb-6">{errorMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { GenericTable } from '../GenericTable';
import { GenericForm } from '../GenericForm';
import { categoryTableConfig, categoryFormConfig } from '../configs/categoryConfig';
import { Categoria } from '../../models/Categoria';
import { useAuth } from '../../context/AuthContext';
import PageLayout from '../../components/PageLayout';

export function CategoriesCrud() {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Categoria | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Categoria | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch('http://localhost:8080/api/categoria', { credentials: 'include' })
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
      credentials: 'include',
    })
      .then(res => res.json())
      .then(() => {
        setShowForm(false);
        setEditing(null);
        return fetch('http://localhost:8080/api/categoria', { credentials: 'include' })
          .then(res => res.json())
          .then((data: Categoria[]) => setCategories(data));
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (row: Categoria) => {
    setCategoryToDelete(row);
    setShowConfirmDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!categoryToDelete) return;
    setLoading(true);
    fetch(`http://localhost:8080/api/categoria/${categoryToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("No se pudo eliminar la categoría. Puede tener instrumentos asociados.");
        }
        return fetch('http://localhost:8080/api/categoria', { credentials: 'include' });
      })
      .then(res => res.json())
      .then((data: Categoria[]) => setCategories(data))
      .catch(err => {
        setErrorMessage(err.message);
        setShowErrorModal(true);
      })
      .finally(() => {
        setLoading(false);
        setShowConfirmDeleteModal(false);
        setCategoryToDelete(null);
      });
  };

  return (
    <PageLayout title="Categorías">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categorías</h1>
        {user?.rol === 'ADMIN' && (
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700"
          >
            Nueva Categoría
          </button>
        )}
      </div>

      <GenericTable<Categoria>
        columns={categoryTableConfig.columns}
        data={categories}
        onEdit={(user?.rol === 'ADMIN' || user?.rol === 'OPERADOR') ? row => { setEditing(row); setShowForm(true); } : undefined}
        onDelete={user?.rol === 'ADMIN' ? handleDelete : undefined}
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

      {/* Modal de confirmación de borrado */}
      {showConfirmDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Confirmar eliminación</h2>
            <p className="text-gray-700 mb-6">¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => { setShowConfirmDeleteModal(false); setCategoryToDelete(null); }}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

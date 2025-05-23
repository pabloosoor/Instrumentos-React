import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const success = await login(usuario, password);
    setLoading(false);
    if (success) {
      setShowSpinner(true);
      setTimeout(() => {
        setShowSpinner(false);
        navigate('/');
      }, 3000);
    } else {
      setError('Usuario y/o Clave incorrectos. Por favor, vuelva a intentar.');
    }
  };

  if (showSpinner) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit} 
          className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-xl px-8 pt-10 pb-8 mb-4 ring-1 ring-white/20"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-md">
            Iniciar Sesión
          </h2>
          
          <div className="mb-6 relative">
            <label className="block mb-2 text-sm font-medium text-indigo-200">Usuario</label>
            <div className="flex items-center bg-indigo-900/30 rounded-lg ring-1 ring-indigo-500/50 focus-within:ring-pink-500 transition-all">
              <FaUserAlt className="text-indigo-300 ml-3" />
              <input
                type="text"
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-white placeholder-indigo-300/70 focus:outline-none rounded-r-lg"
                placeholder="Tu nombre de usuario"
                required
              />
            </div>
          </div>

          <div className="mb-8 relative">
            <label className="block mb-2 text-sm font-medium text-indigo-200">Contraseña</label>
            <div className="flex items-center bg-indigo-900/30 rounded-lg ring-1 ring-indigo-500/50 focus-within:ring-pink-500 transition-all">
              <FaLock className="text-indigo-300 ml-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-white placeholder-indigo-300/70 focus:outline-none rounded-r-lg"
                placeholder="Tu contraseña"
                required
              />
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-pink-500/20 text-pink-200 border border-pink-500/50 rounded-lg text-center text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Ingresando...
              </div>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>
        <p className="text-center text-xs text-indigo-300/80 mt-6">
          &copy;{new Date().getFullYear()} Musical Hendrix. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

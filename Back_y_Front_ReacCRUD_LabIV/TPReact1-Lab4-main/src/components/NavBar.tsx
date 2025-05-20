import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Musical Hendrix</Link>
        <ul className="flex space-x-4 items-center">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/donde-estamos">Donde Estamos</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          {(user?.rol === 'ADMIN' || user?.rol === 'OPERADOR') && (
            <>
              <li><Link to="/categorias">Categorías</Link></li>
              <li><Link to="/instrumentos">Instrumentos</Link></li>
              <li><Link to="/reportes">Reportes</Link></li>
            </>
          )}
          {!isAuthenticated ? (
            <li>
              <button
                onClick={() => navigate('/login')}
                className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded transition"
              >
                Iniciar sesión
              </button>
            </li>
          ) : (
            <>
              <li className="font-semibold text-pink-300">{user?.nombreUsuario}</li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

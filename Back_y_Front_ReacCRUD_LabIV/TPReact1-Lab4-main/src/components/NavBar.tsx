import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaShoppingCart, FaGuitar, FaMapMarkerAlt, FaSignInAlt, FaSignOutAlt, FaClipboardList, FaDatabase, FaChartBar } from 'react-icons/fa';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white p-4 fixed w-full z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold flex items-center group"
        >
          <FaGuitar className="mr-2 text-pink-400 transform group-hover:rotate-12 transition-transform duration-300" />
          <span className="bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-transparent">Musical Hendrix</span>
        </Link>
        <ul className="flex items-center">
          <li className="mx-1 md:mx-2">
            <Link to="/" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-all duration-200 group">
              <FaHome className="mr-1 group-hover:text-pink-400 transition-colors" />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>
          <li className="mx-1 md:mx-2">
            <Link to="/productos" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-all duration-200 group">
              <FaDatabase className="mr-1 group-hover:text-pink-400 transition-colors" />
              <span className="hidden md:inline">Productos</span>
            </Link>
          </li>
          <li className="mx-1 md:mx-2">
            <Link to="/donde-estamos" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-all duration-200 group">
              <FaMapMarkerAlt className="mr-1 group-hover:text-pink-400 transition-colors" />
              <span className="hidden md:inline">Ubicación</span>
            </Link>
          </li>
          <li className="mx-1 md:mx-2">
            <Link to="/carrito" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-all duration-200 group">
              <FaShoppingCart className="mr-1 group-hover:text-pink-400 transition-colors" />
              <span className="hidden md:inline">Carrito</span>
            </Link>
          </li>
          {(user?.rol === 'ADMIN' || user?.rol === 'OPERADOR') && (
            <>
              <li className="mx-1 md:mx-2">
                <Link to="/categorias" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-all duration-200 group">
                  <FaClipboardList className="mr-1 group-hover:text-pink-400 transition-colors" />
                  <span className="hidden md:inline">Categorías</span>
                </Link>
              </li>
              <li className="mx-1 md:mx-2">
                <Link to="/instrumentos" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-all duration-200 group">
                  <FaGuitar className="mr-1 group-hover:text-pink-400 transition-colors" />
                  <span className="hidden md:inline">Instrumentos</span>
                </Link>
              </li>
              <li className="mx-1 md:mx-2">
                <Link to="/reportes" className="flex items-center px-3 py-2 rounded-lg hover:bg-indigo-800 transition-all duration-200 group">
                  <FaChartBar className="mr-1 group-hover:text-pink-400 transition-colors" />
                  <span className="hidden md:inline">Reportes</span>
                </Link>
              </li>
            </>
          )}
          {!isAuthenticated ? (
            <li className="ml-4">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center shadow-lg"
              >
                <FaSignInAlt className="mr-2" />
                Iniciar sesión
              </button>
            </li>
          ) : (
            <>
              <li className="font-semibold text-pink-300 mx-2 px-2 py-1 bg-indigo-800 bg-opacity-50 rounded-lg hidden md:block">
                {user?.nombreUsuario}
              </li>
              <li className="ml-2">
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center shadow-lg"
                >
                  <FaSignOutAlt className="mr-2" />
                  <span className="hidden md:inline">Cerrar sesión</span>
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

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Musical Hendrix</Link>
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/donde-estamos">Donde Estamos</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          <li><Link to="/categorias">Categorías</Link></li>
          <li><Link to="/instrumentos">Instrumentos</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
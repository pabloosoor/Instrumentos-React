import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './components/Home';
import Productos from './components/Productos';
import DetalleInstrumento from './components/DetalleInstrumento';
import DondeEstamos from './components/DondeEstamos';
import { CategoriesCrud } from './modules/admin/CategoriesCRUD';
import { InstrumentsCrud } from "./modules/admin/InstrumentsCrud";
import { CarritoProvider } from './context/CarritoContext';
import Carrito from './components/Carrito';
import MercadoPagoCallback from './components/MercadoPagoCallback';
import LoginForm from './components/LoginForm';
import PrivateRoute from './config/RutasPrivadas';
import Reportes from './components/Reportes'; // 👈 Import nuevo
import ExportarExcel from './components/ExportarExcel';

function App() {
  return (
    <CarritoProvider>
      <Router>
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-4 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/detalle/:id" element={<DetalleInstrumento />} />
            <Route path="/donde-estamos" element={<DondeEstamos />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/payment/callback" element={<MercadoPagoCallback />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/categorias"
              element={
                <PrivateRoute allowedRoles={['ADMIN','OPERADOR']}>
                  <CategoriesCrud />
                </PrivateRoute>
              }
            />
            <Route
              path="/instrumentos"
              element={
                <PrivateRoute allowedRoles={['ADMIN','OPERADOR']}>
                  <InstrumentsCrud />
                </PrivateRoute>
              }
            />
            <Route
              path="/reportes"
              element={
                <PrivateRoute allowedRoles={['ADMIN','OPERADOR']}>
                  <Reportes />
                </PrivateRoute>
              }
            />
            <Route
              path="/exportar"
              element={
                <PrivateRoute allowedRoles={['ADMIN', 'OPERADOR']}>
                  <ExportarExcel />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CarritoProvider>
  );
}

export default App;

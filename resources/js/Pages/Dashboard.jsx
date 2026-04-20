import React, { useState, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import Sidebar from '../Components/Sidebar';
import StatCard from '../Components/StatCard';
import InventoryTable from '../Components/InventoryTable';
import AlertasPage from '../Components/AlertasPage';
import ProductosPage from '../Components/ProductosPage';
import ToastContainer from '../Components/ToastContainer';
import { getStatus } from '../Components/StatusBadge';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Termo personaliz.',  category: 'Accesorios',  stock: 45, min: 10, price: 12.50 },
  { id: 2, name: 'Mochila Swiss Gear', category: 'Bolsos',      stock: 8,  min: 15, price: 45.00 },
  { id: 3, name: 'Audífonos BT',       category: 'Electrónica', stock: 0,  min: 5,  price: 29.99 },
  { id: 4, name: 'Splash VS 250ml',    category: 'Belleza',     stock: 22, min: 8,  price: 8.75  },
  { id: 5, name: 'Camisa Polo',        category: 'Ropa',        stock: 3,  min: 10, price: 18.00 },
  { id: 6, name: 'Taza Cerámica',      category: 'Accesorios',  stock: 60, min: 20, price: 6.50  },
];

let nextId = 7;

export default function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [products,   setProducts]   = useState(MOCK_PRODUCTS);
  const [toasts,     setToasts]     = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleSaveProduct = useCallback((data) => {
    if (data.id) {
      setProducts(prev => prev.map(p => p.id === data.id ? { ...p, ...data } : p));
      addToast(`"${data.name}" actualizado correctamente.`, 'success');
    } else {
      const newProduct = { ...data, id: nextId++ };
      setProducts(prev => [...prev, newProduct]);
      addToast(`"${data.name}" agregado al inventario.`, 'success');
    }
  }, [addToast]);

  const handleDeleteProduct = useCallback((id) => {
    const p = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    addToast(`"${p?.name}" eliminado.`, 'error');
  }, [products, addToast]);

  const lowCount = products.filter(p => getStatus(p.stock, p.min) === 'low').length;
  const outCount = products.filter(p => getStatus(p.stock, p.min) === 'out').length;

  return (
    <>
      <Head title="Inventario - 22 Store SV" />
      <div className="app-shell">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main className="app-content">
          {activePage === 'dashboard' && (
            <section className="dashboard">
              <div className="dashboard__stats">
                <StatCard value={products.length} label="Productos"  variant="default" />
                <StatCard value={lowCount}        label="Stock Bajo" variant="warning" />
                <StatCard value={outCount}        label="Agotados"   variant="danger"  />
              </div>
              <div className="dashboard__table-section">
                <InventoryTable products={products} onSave={handleSaveProduct} onDelete={handleDeleteProduct} showActions />
              </div>
            </section>
          )}
          {activePage === 'productos' && (
            <ProductosPage products={products} onSave={handleSaveProduct} onDelete={handleDeleteProduct} />
          )}
          {activePage === 'alertas' && <AlertasPage products={products} />}
          {activePage === 'movimientos' && <PlaceholderPage title="Movimientos" />}
          {activePage === 'reportes'    && <PlaceholderPage title="Reportes" />}
        </main>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div className="placeholder-page">
      <h2>{title}</h2>
      <p>Sección en construcción.</p>
    </div>
  );
}

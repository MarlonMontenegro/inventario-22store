import React, { useState, useMemo } from 'react';
import StatusBadge from './StatusBadge';
import ProductModal from './ProductModal';
import './InventoryTable.css';

const CATEGORIES = ['Todas', 'Accesorios', 'Bolsos', 'Electrónica', 'Belleza', 'Ropa'];

export default function InventoryTable({ products, onSave, onDelete, showActions = false }) {
  const [search,       setSearch]       = useState('');
  const [filterCat,    setFilterCat]    = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');
  const [modalOpen,    setModalOpen]    = useState(false);
  const [editProduct,  setEditProduct]  = useState(null);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchName = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.category.toLowerCase().includes(search.toLowerCase());
      const matchCat  = filterCat === 'Todas' || p.category === filterCat;
      const matchSt   = filterStatus === 'Todos' ||
        (filterStatus === 'ok'  && p.stock >= p.min) ||
        (filterStatus === 'low' && p.stock > 0 && p.stock < p.min) ||
        (filterStatus === 'out' && p.stock === 0);
      return matchName && matchCat && matchSt;
    });
  }, [products, search, filterCat, filterStatus]);

  const openAdd    = () => { setEditProduct(null); setModalOpen(true); };
  const openEdit   = (p) => { setEditProduct(p);   setModalOpen(true); };
  const closeModal = () => setModalOpen(false);
  const handleSave = (data) => { onSave(data); closeModal(); };

  return (
    <div className="inv-wrapper">
      <div className="inv-toolbar">
        <div className="inv-toolbar__left">
          <div className="inv-search">
            <span className="inv-search__icon">🔍</span>
            <input
              className="inv-search__input"
              type="text"
              placeholder="Buscar producto o categoría..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="inv-search__clear" onClick={() => setSearch('')}>✕</button>
            )}
          </div>
          <select className="inv-filter-select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="inv-filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="Todos">Todos los estados</option>
            <option value="ok">OK</option>
            <option value="low">Stock Bajo</option>
            <option value="out">Agotado</option>
          </select>
        </div>
        {showActions && (
          <button className="btn-add" onClick={openAdd}>+ Agregar Producto</button>
        )}
      </div>

      <div className="inv-table-wrapper">
        <table className="inv-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Mínimo</th>
              <th>Precio</th>
              <th>Estado</th>
              {showActions && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={showActions ? 7 : 6} className="inv-table__empty">
                  No se encontraron productos.
                </td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <tr key={p.id} className={i % 2 === 1 ? 'inv-table__row--alt' : ''}>
                  <td className="inv-table__name">{p.name}</td>
                  <td><span className="cat-tag">{p.category}</span></td>
                  <td className={p.stock === 0 ? 'stock--out' : p.stock < p.min ? 'stock--low' : ''}>{p.stock}</td>
                  <td>{p.min}</td>
                  <td>${p.price?.toFixed(2) ?? '—'}</td>
                  <td><StatusBadge stock={p.stock} min={p.min} /></td>
                  {showActions && (
                    <td className="inv-table__actions">
                      <button className="btn-edit"   onClick={() => openEdit(p)}>✏️</button>
                      <button className="btn-delete" onClick={() => onDelete(p.id)}>🗑</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="inv-count">
        {filtered.length} de {products.length} producto{products.length !== 1 ? 's' : ''}
      </div>

      {modalOpen && (
        <ProductModal
          product={editProduct}
          categories={CATEGORIES.filter(c => c !== 'Todas')}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

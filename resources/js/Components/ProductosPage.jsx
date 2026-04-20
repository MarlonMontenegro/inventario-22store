import React from 'react';
import InventoryTable from './InventoryTable';
import './ProductosPage.css';

export default function ProductosPage({ products, onSave, onDelete }) {
  return (
    <section className="productos-page">
      <div className="productos-page__header">
        <h1 className="page-title">Productos</h1>
        <p className="page-subtitle">Gestiona todo tu catálogo de productos e inventario.</p>
      </div>
      <InventoryTable
        products={products}
        onSave={onSave}
        onDelete={onDelete}
        showActions
      />
    </section>
  );
}

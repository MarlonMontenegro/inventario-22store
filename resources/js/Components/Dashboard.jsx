import React from 'react';
import StatCard from './StatCard';
import InventoryTable from './InventoryTable';
import { getStatus } from './StatusBadge';
import './Dashboard.css';

export default function Dashboard({ products, onSave, onDelete }) {
  const lowCount = products.filter(p => getStatus(p.stock, p.min) === 'low').length;
  const outCount = products.filter(p => getStatus(p.stock, p.min) === 'out').length;

  return (
    <section className="dashboard">
      <div className="dashboard__stats">
        <StatCard value={products.length} label="Productos"  variant="default" />
        <StatCard value={lowCount}        label="Stock Bajo" variant="warning" />
        <StatCard value={outCount}        label="Agotados"   variant="danger"  />
      </div>
      <div className="dashboard__table-section">
        <InventoryTable products={products} onSave={onSave} onDelete={onDelete} showActions />
      </div>
    </section>
  );
}

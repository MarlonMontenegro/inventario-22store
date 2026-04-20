import React from 'react';
import { getStatus } from './StatusBadge';
import './AlertasPage.css';

export default function AlertasPage({ products }) {
  const alerts = products
    .map(p => ({ ...p, status: getStatus(p.stock, p.min) }))
    .filter(p => p.status !== 'ok')
    .sort((a, b) => (a.status === 'out' ? -1 : 1));

  return (
    <section className="alertas-page">
      <div className="alertas-page__header">
        <h1 className="page-title">Alertas</h1>
        <p className="page-subtitle">Productos que requieren atención inmediata.</p>
      </div>

      {alerts.length === 0 ? (
        <div className="alertas-empty">
          <span className="alertas-empty__icon">✅</span>
          <p>¡Todo en orden! No hay alertas activas.</p>
        </div>
      ) : (
        <div className="alertas-list">
          {alerts.map(p => (
            <div key={p.id} className={`alerta-card alerta-card--${p.status}`}>
              <div className="alerta-card__left">
                <span className="alerta-card__icon">
                  {p.status === 'out' ? '🔴' : '🟡'}
                </span>
                <div>
                  <div className="alerta-card__name">{p.name}</div>
                  <div className="alerta-card__cat">{p.category}</div>
                </div>
              </div>
              <div className="alerta-card__right">
                <div className="alerta-card__stat">
                  <span className="alerta-card__stat-label">Stock</span>
                  <span className={`alerta-card__stat-val ${p.status === 'out' ? 'val--out' : 'val--low'}`}>
                    {p.stock}
                  </span>
                </div>
                <div className="alerta-card__divider" />
                <div className="alerta-card__stat">
                  <span className="alerta-card__stat-label">Mínimo</span>
                  <span className="alerta-card__stat-val">{p.min}</span>
                </div>
                <div className="alerta-card__badge">
                  {p.status === 'out' ? 'AGOTADO' : 'STOCK BAJO'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

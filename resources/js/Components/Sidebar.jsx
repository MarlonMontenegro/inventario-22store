import React from 'react';
import './Sidebar.css';

const NAV_ITEMS = [
  { id: 'dashboard',   label: 'Dashboard',    icon: '▦' },
  { id: 'productos',   label: 'Productos',    icon: '🗂' },
  { id: 'movimientos', label: 'Movimientos',  icon: '📋' },
  { id: 'alertas',     label: 'Alertas',      icon: '🔔' },
  { id: 'reportes',    label: 'Reportes',     icon: '📄' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-lines">
          <span /><span /><span />
        </span>
      </div>

      {/* Brand name */}
      <div className="sidebar-brand">22 Store SV</div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? 'nav-item--active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

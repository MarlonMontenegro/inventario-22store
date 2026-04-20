import React from 'react';
import './StatCard.css';

export default function StatCard({ value, label, variant = 'default' }) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}

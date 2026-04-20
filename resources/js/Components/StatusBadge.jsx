import React from 'react';
import './StatusBadge.css';

export function getStatus(stock, min) {
  if (stock === 0)   return 'out';
  if (stock < min)   return 'low';
  return 'ok';
}

const STATUS_CONFIG = {
  ok:  { dot: '#2ecc71', label: 'OK'      },
  low: { dot: '#f5a623', label: 'Bajo'    },
  out: { dot: '#e84b6a', label: 'Agotado' },
};

export default function StatusBadge({ stock, min }) {
  const key = getStatus(stock, min);
  const { dot, label } = STATUS_CONFIG[key];

  return (
    <span className={`status-badge status-badge--${key}`}>
      <span className="status-badge__dot" style={{ background: dot }} />
      {label}
    </span>
  );
}

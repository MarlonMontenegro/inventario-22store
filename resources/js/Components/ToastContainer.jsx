import React from 'react';
import './ToastContainer.css';

export default function ToastContainer({ toasts, onRemove }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-stack">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type}`}>
          <span className="toast__icon">
            {t.type === 'success' ? '✅' : t.type === 'error' ? '🗑' : 'ℹ️'}
          </span>
          <span className="toast__msg">{t.message}</span>
          <button className="toast__close" onClick={() => onRemove(t.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}

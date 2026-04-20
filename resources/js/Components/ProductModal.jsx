import React, { useState, useEffect } from 'react';
import './ProductModal.css';

export default function ProductModal({ product, categories, onSave, onClose }) {
  const isEdit = Boolean(product);

  const [form, setForm] = useState({
    name: '', category: categories[0] || '', stock: '', min: '', price: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setForm({
        name:     product.name,
        category: product.category,
        stock:    product.stock,
        min:      product.min,
        price:    product.price ?? '',
      });
    }
  }, [product]);

  const set = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())                   e.name  = 'El nombre es obligatorio.';
    if (form.stock === '' || form.stock < 0) e.stock = 'Stock inválido.';
    if (form.min   === '' || form.min   < 0) e.min   = 'Mínimo inválido.';
    if (form.price !== '' && form.price < 0) e.price = 'Precio inválido.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({
      ...(product ? { id: product.id } : {}),
      name:     form.name.trim(),
      category: form.category,
      stock:    Number(form.stock),
      min:      Number(form.min),
      price:    form.price !== '' ? Number(form.price) : null,
    });
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal__header">
          <h3 className="modal__title">{isEdit ? 'Editar Producto' : 'Agregar Producto'}</h3>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="modal__body">
          <Field label="Nombre" error={errors.name}>
            <input
              className={`modal__input ${errors.name ? 'modal__input--error' : ''}`}
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Ej. Audífonos BT"
            />
          </Field>
          <Field label="Categoría">
            <select className="modal__input" value={form.category} onChange={e => set('category', e.target.value)}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <div className="modal__row">
            <Field label="Stock actual" error={errors.stock}>
              <input
                className={`modal__input ${errors.stock ? 'modal__input--error' : ''}`}
                type="number" min="0"
                value={form.stock}
                onChange={e => set('stock', e.target.value)}
                placeholder="0"
              />
            </Field>
            <Field label="Stock mínimo" error={errors.min}>
              <input
                className={`modal__input ${errors.min ? 'modal__input--error' : ''}`}
                type="number" min="0"
                value={form.min}
                onChange={e => set('min', e.target.value)}
                placeholder="0"
              />
            </Field>
            <Field label="Precio ($)" error={errors.price}>
              <input
                className={`modal__input ${errors.price ? 'modal__input--error' : ''}`}
                type="number" min="0" step="0.01"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder="0.00"
              />
            </Field>
          </div>
        </div>
        <div className="modal__footer">
          <button className="modal__btn modal__btn--cancel" onClick={onClose}>Cancelar</button>
          <button className="modal__btn modal__btn--save"   onClick={handleSubmit}>
            {isEdit ? 'Guardar cambios' : 'Agregar'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="modal__field">
      <label className="modal__label">{label}</label>
      {children}
      {error && <span className="modal__error">{error}</span>}
    </div>
  );
}

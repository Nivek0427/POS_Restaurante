import { useState } from 'react';
import { IC } from '../../components/common/Icons.jsx';
import { CATEGORIES } from '../../data/mockData.js';
function ProductFormScreen({ navigate, onSave, initialProduct, setEditingProduct }) {
    const [form, setForm] = useState({
        name: initialProduct?.name ?? '',
        category: initialProduct?.category ?? CATEGORIES[0],
        price: initialProduct ? String(initialProduct.price) : '',
        description: '',
        available: initialProduct?.available ?? true,
    });
    const save = () => {
        if (!form.name || !form.price)
            return;
        const payload = {
            id: initialProduct?.id ?? Date.now().toString(),
            name: form.name,
            category: form.category,
            price: parseInt(form.price, 10),
            image: initialProduct?.image ?? 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=320&h=220&fit=crop&auto=format',
            available: form.available,
        };
        onSave(payload);
        navigate('products');
    };
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="max-w-lg mx-auto p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => {
            setEditingProduct(null);
            navigate('products');
        }} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-xl">{initialProduct ? 'Editar producto' : 'Nuevo producto'}</h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Ej: Hamburguesa Especial" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría *</label>
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-700">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Precio *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-mono">$</span>
              <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="15000" className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Descripción opcional del producto..." rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none"/>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm hover:border-orange-300 hover:text-orange-400 transition-colors cursor-pointer">
              <span className="text-3xl block mb-2">📷</span>
              Toca para seleccionar imagen
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-semibold text-gray-900 text-sm">Estado</p>
              <p className="text-xs text-gray-400">El producto aparecerá en el menú</p>
            </div>
            <button onClick={() => setForm({ ...form, available: !form.available })} className={`relative w-12 h-6 rounded-full transition-colors ${form.available ? 'bg-orange-600' : 'bg-gray-300'}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.available ? 'translate-x-6' : 'translate-x-0.5'}`}/>
            </button>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button onClick={() => {
            setEditingProduct(null);
            navigate('products');
        }} className="flex-1 py-3.5 rounded-2xl border border-gray-200 font-semibold text-gray-600 bg-white hover:bg-gray-50 transition-colors">
            Cancelar
          </button>
          <button onClick={save} className="flex-1 py-3.5 rounded-2xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors shadow-md shadow-orange-200">
            {initialProduct ? 'ACTUALIZAR PRODUCTO' : 'GUARDAR PRODUCTO'}
          </button>
        </div>
      </div>
    </div>);
}
// ─── SHIFT SCREEN ─────────────────────────────────────────────────────────────

export default ProductFormScreen

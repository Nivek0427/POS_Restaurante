import { useState } from 'react';
import { IC } from '../../components/common/Icons.jsx';
import { CATEGORIES } from '../../data/mockData.js';
function ProductsScreen({ navigate, products, setProducts, onEdit, setEditingProduct }) {
    const [search, setSearch] = useState('');
    const [catFilter, setCatFilter] = useState('Todos');
    const filtered = products.filter(p => (catFilter === 'Todos' || p.category === catFilter) &&
        p.name.toLowerCase().includes(search.toLowerCase()));
    const toggle = (id) => {
        setProducts(products.map(p => p.id === id ? { ...p, available: !p.available } : p));
    };
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="max-w-5xl mx-auto p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('home')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-xl flex-1">Productos</h2>
          <button onClick={() => {
            setEditingProduct(null);
            navigate('product-form');
        }} className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-orange-700 transition-colors shadow-md shadow-orange-200">
            <IC.plus />Nuevo
          </button>
        </div>

        {/* Search + filter */}
        <div className="flex gap-3 mb-4">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar producto..." className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-gray-700">
            <option>Todos</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map(product => (<div key={product.id} className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex transition-all ${product.available ? 'border-gray-100' : 'border-gray-100 opacity-60'}`}>
              <div className="w-24 h-24 bg-gray-100 flex-shrink-0">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
              </div>
              <div className="flex-1 p-3.5 flex flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <p className="font-semibold text-gray-900 text-sm leading-snug">{product.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0 ${product.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {product.available ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                  <p className="font-bold text-orange-600 font-mono mt-1">{fmt(product.price)}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <button onClick={() => onEdit(product)} className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-xs font-medium hover:bg-gray-100 transition-colors">
                    <IC.edit />Editar
                  </button>
                  <button onClick={() => toggle(product.id)} className="flex items-center gap-1 px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 text-xs font-medium hover:bg-gray-100 transition-colors">
                    <IC.toggle />
                    {product.available ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}
// ─── PRODUCT FORM ─────────────────────────────────────────────────────────────

export default ProductsScreen

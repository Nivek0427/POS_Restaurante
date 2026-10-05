import { useState } from 'react';
import { IC } from '../../components/common/Icons.jsx';
import { PRODUCTS, CATEGORIES, CAT_EMOJI, CUSTOMIZE_CATS } from '../../data/mockData.js';
import { fmt } from '../../utils/format.js';
function NewOrderScreen({ navigate, cart, setCart, onCustomize }) {
    const [activeCat, setActiveCat] = useState('Perros calientes');
    const [showCart, setShowCart] = useState(false);
    const filtered = PRODUCTS.filter(p => p.category === activeCat && p.available);
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
    const addToCart = (product) => {
        if (CUSTOMIZE_CATS.includes(product.category)) {
            onCustomize(product);
        }
        else {
            const existing = cart.find(i => i.productId === product.id && i.options.length === 0);
            if (existing) {
                setCart(cart.map(i => i.key === existing.key ? { ...i, quantity: i.quantity + 1 } : i));
            }
            else {
                setCart([...cart, { key: Date.now().toString(), productId: product.id, name: product.name, price: product.price, quantity: 1, options: [], note: '' }]);
            }
        }
    };
    const updateQty = (key, delta) => {
        const updated = cart.map(i => i.key === key ? { ...i, quantity: i.quantity + delta } : i).filter(i => i.quantity > 0);
        setCart(updated);
    };
    const removeItem = (key) => setCart(cart.filter(i => i.key !== key));
    const CartPanel = () => (<div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">Pedido</p>
          <p className="font-bold text-gray-900 text-lg font-mono">#00126</p>
        </div>
        <button onClick={() => setCart([])} className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
          Limpiar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {cart.length === 0 ? (<div className="flex flex-col items-center justify-center h-full text-center py-12">
            <span className="text-5xl mb-3">🛒</span>
            <p className="text-gray-400 font-medium">El pedido está vacío</p>
            <p className="text-gray-300 text-sm mt-1">Selecciona productos del menú</p>
          </div>) : (cart.map(item => (<div key={item.key} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</p>
                  {item.options.length > 0 && (<p className="text-xs text-gray-400 mt-0.5 leading-snug">{item.options.join(', ')}</p>)}
                  {item.note && (<p className="text-xs text-orange-500 mt-0.5 italic">"{item.note}"</p>)}
                </div>
                <button onClick={() => removeItem(item.key)} className="p-1.5 text-gray-300 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0">
                  <IC.trash />
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                  <button onClick={() => updateQty(item.key, -1)} className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md transition-colors active:bg-gray-200">
                    <IC.minus />
                  </button>
                  <span className="font-bold text-gray-900 w-5 text-center text-sm font-mono">{item.quantity}</span>
                  <button onClick={() => updateQty(item.key, +1)} className="w-7 h-7 flex items-center justify-center text-orange-600 hover:bg-orange-50 rounded-md transition-colors active:bg-orange-100">
                    <IC.plus />
                  </button>
                </div>
                <span className="font-bold text-gray-900 text-sm font-mono">{fmt(item.price * item.quantity)}</span>
              </div>
            </div>)))}
      </div>

      {cart.length > 0 && (<div className="border-t border-gray-100 p-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="font-mono font-semibold text-gray-700 text-sm">{fmt(total)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-900">Total</span>
            <span className="font-bold text-gray-900 text-xl font-mono">{fmt(total)}</span>
          </div>
          <button onClick={() => navigate('review')} className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white rounded-xl py-4 font-bold text-base shadow-md shadow-orange-200 transition-all">
            FINALIZAR PEDIDO
          </button>
        </div>)}
    </div>);
    return (<div className="flex h-[calc(100vh-57px)] overflow-hidden">
      {/* Left: Product catalog */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
        {/* Back + title */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <button onClick={() => navigate('home')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors active:bg-gray-300">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-lg">Nuevo pedido</h2>
          {/* Mobile cart toggle */}
          <button onClick={() => setShowCart(true)} className="ml-auto lg:hidden relative flex items-center gap-1.5 bg-orange-600 text-white px-4 py-2 rounded-xl font-semibold text-sm">
            <IC.cart />
            {itemCount > 0 && (<span className="absolute -top-1.5 -right-1.5 bg-white text-orange-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border-2 border-orange-600">
                {itemCount}
              </span>)}
            {fmt(total)}
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto flex-shrink-0">
          {CATEGORIES.map(cat => (<button key={cat} onClick={() => setActiveCat(cat)} className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${activeCat === cat
                ? 'bg-orange-600 text-white shadow-md shadow-orange-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600'}`}>
              <span>{CAT_EMOJI[cat]}</span>
              <span className="hidden sm:block">{cat}</span>
            </button>))}
        </div>

        {/* Products grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map(product => (<button key={product.id} onClick={() => addToCart(product)} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all active:scale-95 text-left group">
                <div className="relative h-32 bg-gray-100 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"/>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{product.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-orange-600 font-mono text-base">{fmt(product.price)}</span>
                    <div className="w-7 h-7 bg-orange-600 rounded-lg flex items-center justify-center text-white shadow-sm">
                      <IC.plus />
                    </div>
                  </div>
                </div>
              </button>))}
          </div>
        </div>
      </div>

      {/* Right: Cart (desktop) */}
      <div className="hidden lg:flex flex-col w-80 xl:w-96 bg-white border-l border-gray-200">
        <CartPanel />
      </div>

      {/* Mobile cart slide-over */}
      {showCart && (<div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCart(false)}/>
          <div className="relative bg-white w-full max-w-sm h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
              <span className="font-bold text-gray-900">Pedido actual</span>
              <button onClick={() => setShowCart(false)} className="p-2 text-gray-400 hover:text-gray-700 rounded-lg">
                <IC.x />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <CartPanel />
            </div>
          </div>
        </div>)}
    </div>);
}
// ─── CUSTOMIZE MODAL ──────────────────────────────────────────────────────────

export default NewOrderScreen

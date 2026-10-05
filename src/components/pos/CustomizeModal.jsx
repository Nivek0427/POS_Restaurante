import { useState } from 'react';
import { IC } from '../../components/common/Icons.jsx';
import { CUSTOMIZE_OPTIONS } from '../../data/mockData.js';
function CustomizeModal({ product, onClose, onAdd }) {
    const [qty, setQty] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [note, setNote] = useState('');
    const toggleOption = (opt) => {
        setSelectedOptions(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);
    };
    const handleAdd = () => {
        onAdd({
            key: Date.now().toString(),
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            options: selectedOptions,
            note,
        });
    };
    return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header image */}
        <div className="relative h-44 bg-gray-100 rounded-t-3xl overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
          <button onClick={onClose} className="absolute top-3 right-3 p-2 bg-black/30 text-white rounded-full hover:bg-black/50 transition-colors">
            <IC.x />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="font-bold text-white text-xl leading-tight">{product.name}</h2>
            <p className="text-white/80 font-mono font-semibold">{fmt(product.price)}</p>
          </div>
        </div>

        <div className="p-5">
          {/* Quantity */}
          <div className="flex items-center justify-between mb-5">
            <span className="font-semibold text-gray-900">Cantidad</span>
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 p-1.5">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm">
                <IC.minus />
              </button>
              <span className="font-bold text-gray-900 w-6 text-center text-xl font-mono">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center bg-orange-600 rounded-lg text-white hover:bg-orange-700 active:bg-orange-800 transition-colors shadow-sm">
                <IC.plus />
              </button>
            </div>
          </div>

          {/* Options */}
          <p className="font-semibold text-gray-900 mb-3">Opciones</p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {CUSTOMIZE_OPTIONS.map(opt => (<button key={opt} onClick={() => toggleOption(opt)} className={`flex items-center gap-2 px-3 py-3 rounded-xl border font-medium text-sm transition-all ${selectedOptions.includes(opt)
                ? 'bg-orange-50 border-orange-400 text-orange-700'
                : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                <div className={`w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${selectedOptions.includes(opt) ? 'bg-orange-600 border-orange-600' : 'border-gray-300'}`}>
                  {selectedOptions.includes(opt) && <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12"><path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"/></svg>}
                </div>
                <span>{opt}</span>
              </button>))}
          </div>

          {/* Note */}
          <p className="font-semibold text-gray-900 mb-2">Nota adicional</p>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Ej: Una hamburguesa sin tomate y la otra con extra queso." rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent resize-none mb-5"/>

          {/* Actions */}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3.5 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              CANCELAR
            </button>
            <button onClick={handleAdd} className="flex-1 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold shadow-md shadow-orange-200 transition-all">
              AGREGAR · {fmt(product.price * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>);
}
// ─── REVIEW SCREEN ───────────────────────────────────────────────────────────

export default CustomizeModal

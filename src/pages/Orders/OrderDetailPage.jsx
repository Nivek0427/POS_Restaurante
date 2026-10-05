import { IC } from '../../components/common/Icons.jsx';
import { fmt } from '../../utils/format.js';
function OrderDetailScreen({ navigate, order }) {
    if (!order)
        return null;
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="max-w-2xl mx-auto p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('orders')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-xl">Detalle pedido <span className="font-mono text-orange-600">#{order.number}</span></h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4">
          <div className="p-5 border-b border-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-400 mb-1">Hora</p><p className="font-mono text-gray-900 text-sm">{order.time}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Método de pago</p><p className="font-semibold text-gray-900 text-sm">{order.method}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Tipo</p><p className="font-semibold text-gray-900 text-sm">{order.serviceType}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Total</p><p className="font-bold font-mono text-orange-600 text-lg">{fmt(order.total)}</p></div>
            </div>
          </div>
          <div className="p-5">
            <p className="font-semibold text-gray-900 mb-3">Productos</p>
            <div className="space-y-3">
              {order.items.map((item, i) => (<div key={i} className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{item.qty}× {item.name}</p>
                    {item.options.length > 0 && <p className="text-xs text-gray-400 mt-0.5">{item.options.join(', ')}</p>}
                  </div>
                  <span className="font-mono font-semibold text-gray-700 text-sm">{fmt(item.price * item.qty)}</span>
                </div>))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => navigate('invoice')} className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3.5 rounded-2xl font-semibold hover:bg-gray-800 transition-colors">
            <IC.print />Reimprimir
          </button>
          <button onClick={() => navigate('orders')} className="flex-1 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
            Volver a pedidos
          </button>
        </div>
      </div>
    </div>);
}
// ─── PRODUCTS SCREEN ──────────────────────────────────────────────────────────

export default OrderDetailScreen

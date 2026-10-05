import { IC } from '../../components/common/Icons.jsx';
import { fmt } from '../../utils/format.js';
function OrdersScreen({ navigate, orders, setSelectedOrder }) {
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="max-w-4xl mx-auto p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('home')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-xl flex-1">Pedidos</h2>
          <span className="text-sm text-gray-400 font-mono">{orders.length} pedidos hoy</span>
        </div>

        <div className="space-y-3">
          {orders.map(order => (<div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-4 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-gray-900 font-mono text-base">#{order.number}</span>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><IC.clock />{order.time}</span>
                    <span>·</span>
                    <span>{order.items.length} producto{order.items.length !== 1 ? 's' : ''}</span>
                    <span>·</span>
                    <span>{order.method}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900 text-lg font-mono">{fmt(order.total)}</p>
                  <button onClick={() => { setSelectedOrder(order); navigate('order-detail'); }} className="text-xs text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1 ml-auto mt-1">
                    <IC.eye />Ver detalle
                  </button>
                </div>
              </div>
            </div>))}
          {orders.length === 0 && (<div className="text-center py-16 text-gray-400">
              <span className="text-5xl block mb-3">📋</span>
              <p>No hay pedidos registrados hoy</p>
            </div>)}
        </div>
      </div>
    </div>);
}
// ─── ORDER DETAIL SCREEN ──────────────────────────────────────────────────────

export default OrdersScreen

import { IC } from '../../components/common/Icons.jsx';
import { fmt } from '../../utils/format.js';
function ConfirmedScreen({ navigate, order }) {
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50 flex items-center justify-center p-5">
      <div className="max-w-sm w-full text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white">
            <IC.check />
          </div>
        </div>
        <h2 className="font-bold text-gray-900 text-2xl mb-1">¡Pedido registrado!</h2>
        <p className="text-gray-400 text-sm mb-2">correctamente</p>
        {order && (<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 text-left">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">Pedido</span>
              <span className="font-bold font-mono text-orange-600">#{order.number}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">Hora</span>
              <span className="font-mono text-sm text-gray-700">{order.time}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">Método</span>
              <span className="font-semibold text-gray-700 text-sm">{order.method}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500">Tipo</span>
              <span className="font-semibold text-gray-700 text-sm">{order.serviceType}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold font-mono text-gray-900 text-xl">{fmt(order.total)}</span>
            </div>
          </div>)}
        <div className="flex flex-col gap-3">
          <button onClick={() => navigate('invoice')} className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-bold transition-colors">
            <IC.print />
            IMPRIMIR FACTURA
          </button>
          <button onClick={() => navigate('order-detail')} className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
            <IC.eye />
            VER PEDIDO
          </button>
          <button onClick={() => navigate('new-order')} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-2xl font-bold transition-colors">
            NUEVO PEDIDO
          </button>
        </div>
      </div>
    </div>);
}
// ─── INVOICE SCREEN ───────────────────────────────────────────────────────────

export default ConfirmedScreen

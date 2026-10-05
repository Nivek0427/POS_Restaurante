import { IC } from '../../components/common/Icons.jsx';
import { fmt } from '../../utils/format.js';
function InvoiceScreen({ navigate, order }) {
    return (<div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start py-8 px-4">
      {/* Actions (no-print) */}
      <div className="w-full max-w-sm mb-4 flex items-center justify-between no-print">
        <button onClick={() => navigate('confirmed')} className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium text-sm px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <IC.left />
          Volver
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors shadow-sm">
          <IC.print />
          IMPRIMIR
        </button>
      </div>

      {/* Receipt */}
      <div className="bg-white w-full max-w-sm shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white text-center py-6 px-4">
          <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">FF</span>
          </div>
          <h1 className="text-2xl font-bold tracking-wide">FASTFOOD</h1>
          <p className="text-gray-300 text-xs mt-1">Restaurante de comidas rápidas</p>
          <p className="text-gray-400 text-xs mt-0.5">Calle 45 #12-30 · Tel: 310 000 0000</p>
        </div>

        <div className="px-6 py-5">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Factura / Comprobante de venta</p>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Pedido:</span>
            <span className="font-bold font-mono text-gray-900">#{order?.number ?? '00126'}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Fecha:</span>
            <span className="font-mono text-gray-700">{getCurrentDateTime().shortDate}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Hora:</span>
            <span className="font-mono text-gray-700">{order?.time ?? getCurrentDateTime().time}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-500">Cajero:</span>
            <span className="font-mono text-gray-700">Carlos M.</span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4 mb-4">
            <div className="flex justify-between text-xs text-gray-400 uppercase tracking-wide mb-2 font-semibold">
              <span>Producto</span>
              <div className="flex gap-6">
                <span>Cant.</span>
                <span>Total</span>
              </div>
            </div>
            {(order?.items ?? []).map((item, i) => (<div key={i} className="mb-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-800 font-medium flex-1 pr-2 leading-snug">{item.name}</span>
                  <div className="flex gap-6 flex-shrink-0">
                    <span className="font-mono text-gray-600 w-8 text-center">{item.qty}</span>
                    <span className="font-mono text-gray-800 w-16 text-right">{fmt(item.price * item.qty)}</span>
                  </div>
                </div>
                {item.options.length > 0 && (<p className="text-xs text-gray-400 mt-0.5">· {item.options.join(', ')}</p>)}
              </div>))}
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4 mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Subtotal</span>
              <span className="font-mono">{fmt(order?.total ?? 0)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>TOTAL</span>
              <span className="font-mono">{fmt(order?.total ?? 0)}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Tipo:</span>
            <span className="font-semibold text-gray-800">{order?.serviceType ?? 'Mesa'}</span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="text-gray-500">Método de pago:</span>
            <span className="font-semibold text-gray-800">{order?.method ?? 'Efectivo'}</span>
          </div>

          <div className="border-t border-dashed border-gray-200 pt-4 text-center">
            <p className="text-gray-900 font-bold text-base">¡Gracias por su compra!</p>
            <p className="text-gray-400 text-xs mt-1">Vuelva pronto 🍔</p>
          </div>
        </div>
      </div>
    </div>);
}
// ─── ORDERS SCREEN ────────────────────────────────────────────────────────────

export default InvoiceScreen

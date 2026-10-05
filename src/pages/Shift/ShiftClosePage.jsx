import { IC } from '../../components/common/Icons.jsx';
import { fmt } from '../../utils/format.js';
function ShiftCloseScreen({ navigate, setShiftStarted }) {
    const topProducts = [
        { name: 'Americano 2', qty: 22, revenue: 242000 },
        { name: 'Campesino 3', qty: 18, revenue: 270000 },
        { name: 'Sencillo 1', qty: 16, revenue: 96000 },
        { name: 'Coca-Cola', qty: 28, revenue: 112000 },
        { name: 'Americano 1', qty: 12, revenue: 96000 },
    ];
    const maxQty = Math.max(...topProducts.map(p => p.qty));
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="max-w-2xl mx-auto p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('shift')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-xl">Cierre de turno</h2>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[
            ['Usuario', 'Carlos M.'],
            ['Inicio', '7:00 AM'],
            ['Fin', '11:10 AM'],
            ['Duración', '4h 10m'],
            ['Pedidos', '9'],
            ['Ventas', fmt(144000)],
        ].map(([k, v]) => (<div key={k}>
                <p className="text-xs text-gray-400 mb-0.5">{k}</p>
                <p className="font-semibold text-gray-900 font-mono">{v}</p>
              </div>))}
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="font-semibold text-gray-900 mb-3 text-sm">Ventas por método de pago</p>
            <div className="space-y-2">
              {[
            { method: 'Efectivo', amount: 68000, color: 'bg-green-500' },
            { method: 'Transferencia', amount: 34000, color: 'bg-violet-500' },
        ].map(m => (<div key={m.method} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-24 flex-shrink-0">{m.method}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full`} style={{ width: `${(m.amount / 144000) * 100}%` }}/>
                  </div>
                  <span className="font-mono text-sm font-semibold text-gray-900 w-20 text-right">{fmt(m.amount)}</span>
                </div>))}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-bold text-gray-900 text-sm">Total</span>
                <span className="font-bold font-mono text-orange-600">{fmt(144000)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
          <p className="font-bold text-gray-900 mb-4">Productos más vendidos</p>
          <div className="space-y-3">
            {topProducts.map((p, i) => (<div key={p.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 w-4 flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-900 font-medium truncate">{p.name}</span>
                    <span className="text-xs font-mono text-gray-500 ml-2 flex-shrink-0">{p.qty} uds</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(p.qty / maxQty) * 100}%` }}/>
                  </div>
                </div>
              </div>))}
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3.5 rounded-2xl font-semibold hover:bg-gray-200 transition-colors border border-gray-200">
            <IC.print />Imprimir
          </button>
          <button onClick={() => { setShiftStarted(false); navigate('home'); }} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-2xl font-bold transition-colors shadow-md shadow-red-200">
            CONFIRMAR CIERRE
          </button>
        </div>
      </div>
    </div>);
}
// ─── REPORTS SCREEN ───────────────────────────────────────────────────────────

export default ShiftCloseScreen

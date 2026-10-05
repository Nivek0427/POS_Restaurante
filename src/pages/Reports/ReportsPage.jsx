import { useState } from 'react';
import { IC } from '../../components/common/Icons.jsx';
import { fmt } from '../../utils/format.js';
function ReportsScreen({ navigate }) {
    const [period, setPeriod] = useState('hoy');
    const data = {
        total: 684000, orders: 37, avg: 18486,
        byMethod: [
            { method: 'Efectivo', amount: 470000, pct: 69 },
            { method: 'Transferencia', amount: 214000, pct: 31 },
        ],
        byShift: [
            { label: 'Turno 1 (7-12)', amount: 285000 },
            { label: 'Turno 2 (12-17)', amount: 253000 },
            { label: 'Turno 3 (17-22)', amount: 146000 },
        ],
        topProducts: [
            { name: 'Americano 2', qty: 58, revenue: 638000 },
            { name: 'Campesino 3', qty: 45, revenue: 675000 },
            { name: 'Coca-Cola', qty: 72, revenue: 288000 },
            { name: 'Sencillo 1', qty: 41, revenue: 246000 },
            { name: 'Americano 3', qty: 34, revenue: 476000 },
            { name: 'Campesino 2', qty: 29, revenue: 348000 },
        ],
    };
    const maxShift = Math.max(...data.byShift.map(s => s.amount));
    const maxProd = Math.max(...data.topProducts.map(p => p.qty));
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="max-w-5xl mx-auto p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('home')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-xl flex-1">Reportes</h2>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 text-sm bg-gray-900 text-white px-4 py-2 rounded-xl font-semibold hover:bg-gray-800 transition-colors">
            <IC.print />Imprimir
          </button>
        </div>

        {/* Period selector */}
        <div className="flex gap-2 mb-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5">
          {[['turno', 'Turno'], ['hoy', 'Hoy'], ['semana', 'Semana'], ['mes', 'Mes']].map(([k, label]) => (<button key={k} onClick={() => setPeriod(k)} className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${period === k ? 'bg-orange-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
              {label}
            </button>))}
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Total ventas', value: fmt(data.total), color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
            { label: 'Pedidos', value: `${data.orders}`, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
            { label: 'Ticket promedio', value: fmt(data.avg), color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-100' },
        ].map(k => (<div key={k.label} className={`${k.bg} border ${k.border} rounded-2xl p-4`}>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">{k.label}</p>
              <p className={`font-bold font-mono ${k.color} text-xl`}>{k.value}</p>
            </div>))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* By method */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-gray-900 mb-4">Ventas por método de pago</p>
            <div className="space-y-3">
              {data.byMethod.map(m => (<div key={m.method}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700 font-medium">{m.method}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 font-mono">{m.pct}%</span>
                      <span className="text-sm font-bold font-mono text-gray-900">{fmt(m.amount)}</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${m.method === 'Efectivo' ? 'bg-green-500' : 'bg-violet-500'}`} style={{ width: `${m.pct}%` }}/>
                  </div>
                </div>))}
            </div>
          </div>

          {/* By shift */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="font-bold text-gray-900 mb-4">Ventas por turno</p>
            <div className="flex items-end gap-3 h-32 mb-2">
              {data.byShift.map(s => (<div key={s.label} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-mono text-gray-500">{fmt(s.amount)}</span>
                  <div className="w-full bg-orange-500 rounded-t-lg" style={{ height: `${(s.amount / maxShift) * 80}px` }}/>
                </div>))}
            </div>
            <div className="flex gap-3">
              {data.byShift.map(s => (<div key={s.label} className="flex-1 text-center">
                  <span className="text-xs text-gray-400">{s.label.split(' ')[0]} {s.label.split(' ')[1]}</span>
                </div>))}
            </div>
          </div>
        </div>

        {/* Top products table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="font-bold text-gray-900 mb-4">Productos más vendidos</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                  <th className="text-left pb-3 font-semibold">#</th>
                  <th className="text-left pb-3 font-semibold">Producto</th>
                  <th className="text-center pb-3 font-semibold">Cantidad</th>
                  <th className="text-right pb-3 font-semibold">Ingresos</th>
                  <th className="text-right pb-3 font-semibold w-32">Tendencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.topProducts.map((p, i) => (<tr key={p.name} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-2 text-gray-400 font-mono text-xs">{i + 1}</td>
                    <td className="py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="py-3 text-center font-mono text-gray-700">{p.qty}</td>
                    <td className="py-3 text-right font-mono font-semibold text-gray-900">{fmt(p.revenue)}</td>
                    <td className="py-3 pl-4">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(p.qty / maxProd) * 100}%` }}/>
                      </div>
                    </td>
                  </tr>))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-3.5 rounded-2xl font-bold transition-colors shadow-md shadow-orange-200">
          <IC.reports />
          GENERAR REPORTE
        </button>
      </div>
    </div>);
}
// ─── APP ROOT ────────────────────────────────────────────────────────────────

export default ReportsScreen

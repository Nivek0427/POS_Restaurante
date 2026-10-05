import { IC } from '../../components/common/Icons.jsx';
import { fmt, getCurrentDateTime } from '../../utils/format.js';
function HomeScreen({ navigate, shiftStarted, stats }) {
    const today = getCurrentDateTime();
    const cards = [
        { label: 'Ventas del turno', value: fmt(stats.sales), sub: 'hoy', color: 'text-orange-600' },
        { label: 'Pedidos', value: `${stats.ordersCount}`, sub: 'realizados', color: 'text-blue-600' },
        { label: 'Total recaudado', value: fmt(stats.totalCollected), sub: 'turno actual', color: 'text-green-600' },
    ];
    return (<div className="p-5 max-w-5xl mx-auto">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido, Carlos 👋</h1>
        <p className="text-gray-500 text-sm mt-0.5">{today.fullDate} · {today.time}</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {cards.map(s => (<div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">{s.label}</p>
            <p className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>))}
      </div>

      {/* Primary CTA */}
      <button onClick={() => navigate('new-order')} className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white rounded-2xl py-5 flex items-center justify-center gap-3 shadow-lg shadow-orange-200 transition-all mb-4 font-bold text-xl">
        <span className="text-2xl">🛒</span>
        NUEVO PEDIDO
      </button>

      {/* Navigation grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
            { screen: 'orders', icon: '📋', label: 'Pedidos', desc: '5 hoy', color: 'bg-blue-50 border-blue-100', labelColor: 'text-blue-700' },
            { screen: 'products', icon: '📦', label: 'Productos', desc: '14 activos', color: 'bg-violet-50 border-violet-100', labelColor: 'text-violet-700' },
            { screen: 'reports', icon: '📊', label: 'Reportes', desc: 'Estadísticas', color: 'bg-emerald-50 border-emerald-100', labelColor: 'text-emerald-700' },
            { screen: 'shift', icon: '⏰', label: 'Turno actual', desc: shiftStarted ? 'Iniciado · 7:00 AM' : 'Sin turno activo', color: 'bg-amber-50 border-amber-100', labelColor: 'text-amber-700' },
        ].map(item => (<button key={item.screen} onClick={() => navigate(item.screen)} className={`${item.color} border rounded-2xl p-5 flex flex-col items-start gap-2 hover:brightness-95 active:brightness-90 transition-all text-left`}>
            <span className="text-3xl">{item.icon}</span>
            <div>
              <p className={`font-bold text-base ${item.labelColor}`}>{item.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </button>))}
      </div>
    </div>);
}
// ─── NEW ORDER SCREEN ─────────────────────────────────────────────────────────

export default HomeScreen

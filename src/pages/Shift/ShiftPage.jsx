import { useState } from 'react';
import { IC } from '../../components/common/Icons.jsx';
import { fmt, getCurrentDateTime } from '../../utils/format.js';
function ShiftScreen({ navigate, shiftStarted, setShiftStarted }) {
    const [fondo, setFondo] = useState('');
    const today = getCurrentDateTime();
    if (!shiftStarted) {
        return (<div className="min-h-[calc(100vh-57px)] bg-gray-50 flex items-center justify-center p-5">
        <div className="max-w-md w-full">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('home')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
              <IC.left />
            </button>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-4xl">⏰</span>
            </div>
            <h2 className="font-bold text-gray-900 text-2xl mb-1">Iniciar turno</h2>
            <p className="text-gray-400 text-sm mb-6">{today.fullDate}</p>

            <div className="text-left mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Usuario</label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <IC.user />
                <span className="text-gray-700 font-medium">Carlos Martínez</span>
              </div>
            </div>
            <div className="text-left mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hora de inicio</label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <IC.clock />
                <span className="font-mono text-gray-700">{today.time}</span>
              </div>
            </div>
            <div className="text-left mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Fondo inicial</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono text-sm">$</span>
                <input type="number" value={fondo} onChange={e => setFondo(e.target.value)} placeholder="50000" className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
              </div>
            </div>

            <button onClick={() => { setShiftStarted(true); navigate('home'); }} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold text-base shadow-md shadow-orange-200 transition-all">
              INICIAR TURNO
            </button>
          </div>
        </div>
      </div>);
    }
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="max-w-2xl mx-auto p-5">
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('home')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-xl">Turno actual</h2>
          <span className="ml-auto flex items-center gap-1.5 text-xs font-semibold bg-green-100 text-green-700 border border-green-200 px-3 py-1.5 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
            Activo
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div><p className="text-xs text-gray-400 mb-1">Usuario</p><p className="font-semibold text-gray-900">Carlos M.</p></div>
            <div><p className="text-xs text-gray-400 mb-1">Inicio</p><p className="font-mono text-gray-900">7:00 AM</p></div>
            <div><p className="text-xs text-gray-400 mb-1">Duración</p><p className="font-mono text-gray-900 font-semibold">4h 10m</p></div>
            <div><p className="text-xs text-gray-400 mb-1">Fondo</p><p className="font-mono text-gray-900">{fmt(50000)}</p></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label: 'Ventas realizadas', value: fmt(144000), emoji: '💰', color: 'text-green-600' },
            { label: 'Pedidos realizados', value: '9', emoji: '📋', color: 'text-blue-600' },
            { label: 'Ticket promedio', value: fmt(16000), emoji: '🧾', color: 'text-violet-600' },
            { label: 'Pendientes', value: '2', emoji: '⏳', color: 'text-amber-600' },
        ].map(s => (<div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <span className="text-2xl block mb-2">{s.emoji}</span>
              <p className={`font-bold text-2xl font-mono ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>))}
        </div>

        <button onClick={() => navigate('shift-close')} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-4 rounded-2xl font-bold text-base shadow-md shadow-red-200 transition-all">
          <IC.x />
          CERRAR TURNO
        </button>
      </div>
    </div>);
}
// ─── SHIFT CLOSE SCREEN ───────────────────────────────────────────────────────

export default ShiftScreen

import { IC } from '../../components/common/Icons.jsx';
function TopBar({ navigate, shiftStarted, menuOpen, setMenuOpen }) {
    return (<>
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <button onClick={() => navigate('home')} className="flex items-center gap-2.5 active:opacity-70">
          <div className="w-9 h-9 bg-orange-600 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm tracking-tighter">FF</span>
          </div>
          <span className="font-bold text-gray-900 text-xl tracking-tight">FastFood</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5">
            <IC.user />
            <span className="font-medium hidden sm:block">Carlos M.</span>
          </div>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border ${shiftStarted ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
            <div className={`w-1.5 h-1.5 rounded-full ${shiftStarted ? 'bg-green-500' : 'bg-gray-400'}`}/>
            <span className="hidden sm:block">{shiftStarted ? 'Turno activo' : 'Sin turno'}</span>
          </div>
          <button onClick={() => setMenuOpen(true)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors active:bg-gray-200">
            <IC.menu />
          </button>
        </div>
      </header>

      {/* Slide-over menu */}
      {menuOpen && (<div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)}/>
          <div className="relative bg-white w-72 h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-bold text-gray-900 text-lg">Menú</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <IC.x />
              </button>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-1">
              {[
                ['home', 'Inicio', '🏠'],
                ['new-order', 'Nuevo pedido', '🛒'],
                ['orders', 'Pedidos', '📋'],
                ['products', 'Productos', '📦'],
                ['shift', 'Turno', '⏰'],
                ['reports', 'Reportes', '📊'],
            ].map(([s, label, emoji]) => (<button key={s} onClick={() => { navigate(s); setMenuOpen(false); }} className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-700 transition-colors text-left font-medium active:bg-orange-100">
                  <span className="text-xl">{emoji}</span>
                  <span>{label}</span>
                </button>))}
            </div>
            {shiftStarted && (<div className="p-4 border-t border-gray-100">
                <button onClick={() => { navigate('shift-close'); setMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-semibold active:bg-red-100">
                  <IC.x />
                  Cerrar turno
                </button>
              </div>)}
          </div>
        </div>)}
    </>);
}
// ─── HOME SCREEN ─────────────────────────────────────────────────────────────

export default TopBar

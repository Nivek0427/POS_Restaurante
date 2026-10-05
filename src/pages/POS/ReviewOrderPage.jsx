import { useState } from 'react';
import { IC } from '../../components/common/Icons.jsx';
import { fmt, getCurrentDateTime } from '../../utils/format.js';
function ReviewScreen({ navigate, cart, setConfirmedOrder }) {
    const [method, setMethod] = useState('Efectivo');
    const [orderType, setOrderType] = useState('Mesa');
    const today = getCurrentDateTime();
    const [received, setReceived] = useState('');
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const receivedNum = parseFloat(received.replace(/[^0-9]/g, '')) || 0;
    const change = receivedNum - total;
    const confirm = () => {
        const order = {
            id: Date.now().toString(),
            number: '00126',
            time: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
            total,
            method,
            serviceType: orderType,
            items: cart.map(i => ({ name: i.name, qty: i.quantity, price: i.price, options: i.options })),
        };
        setConfirmedOrder(order);
        navigate('confirmed');
    };
    return (<div className="min-h-[calc(100vh-57px)] bg-gray-50">
      <div className="max-w-2xl mx-auto p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <button onClick={() => navigate('new-order')} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-lg transition-colors">
            <IC.left />
          </button>
          <h2 className="font-bold text-gray-900 text-xl">Revisión y cobro</h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-4 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
            <span className="font-bold text-gray-900">Pedido <span className="font-mono text-orange-600">#00126</span></span>
            <span className="text-sm text-gray-400">{today.fullDate.split(',')[0]}, {today.time}</span>
          </div>
          <div className="divide-y divide-gray-50">
            {cart.map(item => (<div key={item.key} className="flex items-start justify-between px-5 py-3.5">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-600 font-mono text-sm w-5">{item.quantity}×</span>
                    <span className="font-semibold text-gray-900 text-sm">{item.name}</span>
                  </div>
                  {item.options.length > 0 && (<p className="text-xs text-gray-400 mt-0.5 ml-7 leading-snug">{item.options.join(', ')}</p>)}
                  {item.note && (<p className="text-xs text-orange-400 mt-0.5 ml-7 italic">"{item.note}"</p>)}
                </div>
                <span className="font-mono font-semibold text-gray-700 text-sm">{fmt(item.price * item.quantity)}</span>
              </div>))}
          </div>
          <div className="bg-gray-50 px-5 py-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Subtotal</span>
              <span className="font-mono">{fmt(total)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span className="font-mono text-orange-600">{fmt(total)}</span>
            </div>
          </div>
        </div>

        {/* Order type */}
        <p className="font-semibold text-gray-700 mb-3 px-1">Tipo de pedido</p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            'Mesa',
            'Para llevar',
            'Para recoger',
            'Domicilio',
        ].map(type => (<button key={type} onClick={() => setOrderType(type)} className={`py-3 rounded-2xl border-2 font-semibold text-sm transition-all ${orderType === type
                ? 'bg-orange-50 border-orange-400 text-orange-700 shadow-md shadow-orange-100'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              {type}
            </button>))}
        </div>

        {/* Payment method */}
        <p className="font-semibold text-gray-700 mb-3 px-1">Método de pago</p>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { key: 'Efectivo', icon: <IC.cash />, label: 'Efectivo' },
            { key: 'Transferencia', icon: <IC.transfer />, label: 'Transferencia' },
        ].map(m => (<button key={m.key} onClick={() => setMethod(m.key)} className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 font-semibold text-sm transition-all ${method === m.key
                ? 'bg-orange-50 border-orange-400 text-orange-700 shadow-md shadow-orange-100'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
              {m.icon}
              {m.label}
            </button>))}
        </div>

        {/* Cash calculation */}
        {method === 'Efectivo' && (<div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4">
            <p className="font-semibold text-gray-900 mb-3">Cálculo de cambio</p>
            <div className="grid grid-cols-2 gap-4">
              {[20000, 50000, 100000, 200000].map(v => (<button key={v} onClick={() => setReceived(v.toString())} className={`py-3 rounded-xl border-2 font-mono font-semibold text-sm transition-all ${received === v.toString() ? 'bg-orange-50 border-orange-400 text-orange-700' : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                  {fmt(v)}
                </button>))}
            </div>
            <input type="number" value={received} onChange={e => setReceived(e.target.value)} placeholder="O ingresa el monto recibido..." className="w-full mt-3 border border-gray-200 rounded-xl px-4 py-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"/>
            {receivedNum > 0 && (<div className="mt-4 grid grid-cols-3 gap-3">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Total</p>
                  <p className="font-mono font-bold text-gray-900">{fmt(total)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Recibido</p>
                  <p className="font-mono font-bold text-blue-600">{fmt(receivedNum)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Cambio</p>
                  <p className={`font-mono font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{fmt(Math.abs(change))}</p>
                </div>
              </div>)}
          </div>)}

        <button onClick={confirm} className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2">
          <IC.check />
          CONFIRMAR Y GENERAR FACTURA
        </button>
      </div>
    </div>);
}
// ─── CONFIRMED SCREEN ─────────────────────────────────────────────────────────

export default ReviewScreen

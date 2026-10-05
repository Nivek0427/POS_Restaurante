import { useMemo, useState } from 'react';
import { PRODUCTS } from '../data/mockData.js';
import MainLayout from '../layouts/MainLayout.jsx';
import HomeScreen from '../pages/Home/HomePage.jsx';
import NewOrderScreen from '../pages/POS/NewOrderPage.jsx';
import CustomizeModal from '../components/pos/CustomizeModal.jsx';
import ReviewScreen from '../pages/POS/ReviewOrderPage.jsx';
import ConfirmedScreen from '../pages/POS/ConfirmedOrderPage.jsx';
import InvoiceScreen from '../pages/POS/InvoicePage.jsx';
import OrdersScreen from '../pages/Orders/OrdersPage.jsx';
import OrderDetailScreen from '../pages/Orders/OrderDetailPage.jsx';
import ProductsScreen from '../pages/Products/ProductsPage.jsx';
import ProductFormScreen from '../pages/Products/ProductFormPage.jsx';
import ShiftScreen from '../pages/Shift/ShiftPage.jsx';
import ShiftCloseScreen from '../pages/Shift/ShiftClosePage.jsx';
import ReportsScreen from '../pages/Reports/ReportsPage.jsx';

function App() {
    const [screen, setScreen] = useState('home');
    const [cart, setCart] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [shiftStarted, setShiftStarted] = useState(true);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState(PRODUCTS);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [confirmedOrder, setConfirmedOrder] = useState(null);
    const [customizeProduct, setCustomizeProduct] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);
    const homeStats = useMemo(() => {
        const sales = orders.reduce((sum, order) => sum + order.total, 0);
        return {
            sales,
            ordersCount: orders.length,
            totalCollected: sales,
        };
    }, [orders]);
    const navigate = (s) => {
        setScreen(s);
        setMenuOpen(false);
        window.scrollTo(0, 0);
    };
    const handleCustomize = (product) => {
        setCustomizeProduct(product);
    };
    const handleAddFromCustomize = (item) => {
        const existing = cart.find(i => i.productId === item.productId && JSON.stringify(i.options) === JSON.stringify(item.options) && i.note === item.note);
        if (existing) {
            setCart(cart.map(i => i.key === existing.key ? { ...i, quantity: i.quantity + item.quantity } : i));
        }
        else {
            setCart([...cart, item]);
        }
        setCustomizeProduct(null);
    };
    const handleOrderConfirm = (order) => {
        setOrders(prev => [...prev, order]);
        setConfirmedOrder(order);
        setSelectedOrder(order);
        setCart([]);
    };
    const addProduct = (p) => {
        setProducts(prev => [...prev, p]);
    };
    const updateProduct = (p) => {
        setProducts(prev => prev.map(product => product.id === p.id ? p : product));
        setEditingProduct(null);
    };
    const openProductEditor = (p) => {
        setEditingProduct(p);
        navigate('product-form');
    };
    return (<MainLayout showHeader={screen !== 'invoice'} navigate={navigate} shiftStarted={shiftStarted} menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      <main>
        {screen === 'home' && <HomeScreen navigate={navigate} shiftStarted={shiftStarted} stats={homeStats}/>}
        {screen === 'new-order' && (<NewOrderScreen navigate={navigate} cart={cart} setCart={setCart} onCustomize={handleCustomize}/>)}
        {screen === 'review' && (<ReviewScreen navigate={navigate} cart={cart} setConfirmedOrder={handleOrderConfirm}/>)}
        {screen === 'confirmed' && <ConfirmedScreen navigate={navigate} order={confirmedOrder}/>}
        {screen === 'invoice' && <InvoiceScreen navigate={navigate} order={confirmedOrder ?? selectedOrder}/>}
        {screen === 'orders' && (<OrdersScreen navigate={navigate} orders={orders} setSelectedOrder={setSelectedOrder}/>)}
        {screen === 'order-detail' && <OrderDetailScreen navigate={navigate} order={selectedOrder}/>}
        {screen === 'products' && (<ProductsScreen navigate={navigate} products={products} setProducts={setProducts} onEdit={openProductEditor} setEditingProduct={setEditingProduct}/>)}
        {screen === 'product-form' && (<ProductFormScreen navigate={navigate} onSave={editingProduct ? updateProduct : addProduct} initialProduct={editingProduct} setEditingProduct={setEditingProduct}/>)}
        {screen === 'shift' && <ShiftScreen navigate={navigate} shiftStarted={shiftStarted} setShiftStarted={setShiftStarted}/>}
        {screen === 'shift-close' && <ShiftCloseScreen navigate={navigate} setShiftStarted={setShiftStarted}/>}
        {screen === 'reports' && <ReportsScreen navigate={navigate}/>}
      </main>

      {/* Customize modal */}
      {customizeProduct && (<CustomizeModal product={customizeProduct} onClose={() => setCustomizeProduct(null)} onAdd={handleAddFromCustomize}/>)}
    </MainLayout>);
}

export default App

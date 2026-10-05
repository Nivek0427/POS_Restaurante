const PRODUCTS = [
    // Americano
    { id: 'a1', name: 'Americano 1', category: 'Perros calientes', price: 8000, image: 'https://images.unsplash.com/photo-1612392061787-2e67f46f83c9?w=320&h=220&fit=crop&auto=format', available: true },
    { id: 'a2', name: 'Americano 2', category: 'Perros calientes', price: 11000, image: 'https://images.unsplash.com/photo-1612392061787-2e67f46f83c9?w=320&h=220&fit=crop&auto=format', available: true },
    { id: 'a3', name: 'Americano 3', category: 'Perros calientes', price: 14000, image: 'https://images.unsplash.com/photo-1612392061787-2e67f46f83c9?w=320&h=220&fit=crop&auto=format', available: true },
    // Campesino
    { id: 'c1', name: 'Campesino 1', category: 'Perros calientes', price: 9000, image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=320&h=220&fit=crop&auto=format', available: true },
    { id: 'c2', name: 'Campesino 2', category: 'Perros calientes', price: 12000, image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=320&h=220&fit=crop&auto=format', available: true },
    { id: 'c3', name: 'Campesino 3', category: 'Perros calientes', price: 15000, image: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=320&h=220&fit=crop&auto=format', available: true },
    // Sencillo
    { id: 's1', name: 'Sencillo 1', category: 'Perros calientes', price: 6000, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=320&h=220&fit=crop&auto=format', available: true },
    { id: 's2', name: 'Sencillo 2', category: 'Perros calientes', price: 8000, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=320&h=220&fit=crop&auto=format', available: true },
    { id: 's3', name: 'Sencillo 3', category: 'Perros calientes', price: 10000, image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=320&h=220&fit=crop&auto=format', available: true },
    // Bebidas
    { id: 'b1', name: 'Coca-Cola', category: 'Bebidas', price: 4000, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=320&h=220&fit=crop&auto=format', available: true },
    { id: 'b2', name: 'Agua Botella', category: 'Bebidas', price: 3000, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=320&h=220&fit=crop&auto=format', available: true },
    { id: 'b3', name: 'Jugo Natural', category: 'Bebidas', price: 5000, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=320&h=220&fit=crop&auto=format', available: true },
];
const CATEGORIES = ['Perros calientes', 'Bebidas'];
const CAT_EMOJI = {
    'Perros calientes': '🌭',
    'Bebidas': '🥤',
};
const CUSTOMIZE_CATS = ['Perros calientes'];
const CUSTOMIZE_OPTIONS = ['Sin cebolla', 'Sin tomate', 'Sin lechuga', 'Sin salsa', 'Sin salsa de ajo', 'Extra queso', 'Extra carne'];
const INIT_ORDERS = [
    { id: '1', number: '00121', time: '10:05 AM', total: 17000, method: 'Efectivo', serviceType: 'Mesa', items: [{ name: 'Americano 3', qty: 1, price: 14000, options: [] }, { name: 'Agua Botella', qty: 1, price: 3000, options: [] }] },
    { id: '2', number: '00122', time: '10:18 AM', total: 22000, method: 'Transferencia', serviceType: 'Para llevar', items: [{ name: 'Campesino 2', qty: 1, price: 12000, options: ['Sin cebolla'] }, { name: 'Sencillo 1', qty: 1, price: 6000, options: [] }, { name: 'Coca-Cola', qty: 1, price: 4000, options: [] }] },
    { id: '3', number: '00123', time: '10:35 AM', total: 27000, method: 'Efectivo', serviceType: 'Domicilio', items: [{ name: 'Americano 2', qty: 2, price: 11000, options: ['Sin salsa de ajo'] }, { name: 'Jugo Natural', qty: 1, price: 5000, options: [] }] },
    { id: '4', number: '00124', time: '10:52 AM', total: 17000, method: 'Transferencia', serviceType: 'Para recoger', items: [{ name: 'Campesino 1', qty: 1, price: 9000, options: [] }, { name: 'Sencillo 2', qty: 1, price: 8000, options: [] }] },
    { id: '5', number: '00125', time: '11:10 AM', total: 10000, method: 'Efectivo', serviceType: 'Mesa', items: [{ name: 'Sencillo 3', qty: 1, price: 10000, options: ['Sin tomate'] }] },
];
// ─── UTILS ───────────────────────────────────────────────────────────────────

export { PRODUCTS, CATEGORIES, CAT_EMOJI, CUSTOMIZE_CATS, CUSTOMIZE_OPTIONS, INIT_ORDERS };

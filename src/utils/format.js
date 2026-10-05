const fmt = (n) => `$${n.toLocaleString('es-CO')}`;
const getCurrentDateTime = () => {
    const now = new Date();
    return {
        fullDate: now.toLocaleDateString('es-CO', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }),
        shortDate: now.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }),
        time: now.toLocaleTimeString('es-CO', {
            hour: '2-digit',
            minute: '2-digit',
        }),
    };
};

export { fmt, getCurrentDateTime }

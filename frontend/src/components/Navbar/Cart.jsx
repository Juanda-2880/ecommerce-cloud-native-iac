import { useState, useEffect } from 'react'
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)

    const loadCart = () => {
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
        setCartItems(storedCart)
        const newTotal = storedCart.reduce((acc, item) => acc + (item.price_cop * item.quantity), 0)
        setTotal(newTotal)
    }

    useEffect(() => {
        loadCart()
        window.addEventListener('cartUpdate', loadCart)
        return () => window.removeEventListener('cartUpdate', loadCart)
    }, [])

    const updateQuantity = (id, delta) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, Math.min(item.quantity + delta, item.quantity_available || 99))
                return { ...item, quantity: newQty }
            }
            return item
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        loadCart()
    }

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        loadCart()
        window.dispatchEvent(new Event('cartUpdate'))
    }

    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle border border-primary/20 hover:border-primary transition-all relative group">
                <div className="indicator">
                    <FaShoppingCart className="text-xl group-hover:scale-110 transition-transform" />
                    {cartItems.length > 0 && (
                        <span className="badge badge-sm badge-primary indicator-item font-black border-none animate-pulse">
                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                    )}
                </div>
            </div>
            <div
                tabIndex={0}
                className="card card-compact dropdown-content z-[100] mt-4 w-80 bg-neutral/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10 rounded-2xl"
            >
                <div className="card-body">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-black uppercase tracking-tighter text-white italic">Neural Basket</span>
                        <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">
                            {cartItems.length} Units
                        </span>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto space-y-3 mb-4 custom-scrollbar pr-1">
                        {cartItems.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Registry Empty</p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-3 bg-base-300/50 p-3 rounded-xl border border-white/5 group">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral shrink-0">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-700 font-bold italic">N/A</div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[11px] font-black uppercase text-white truncate">{item.name}</div>
                                        <div className="text-[10px] font-bold text-primary italic">
                                            ${Number(item.price_cop).toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="hover:text-primary transition-colors"><FaMinus size={10} /></button>
                                            <span className="text-[10px] font-black bg-white/5 px-2 rounded">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="hover:text-primary transition-colors"><FaPlus size={10} /></button>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => removeItem(item.id)}
                                        className="text-gray-600 hover:text-error transition-colors p-1"
                                    >
                                        <FaTrash size={12} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t border-white/10 pt-4 space-y-3">
                        <div className="flex justify-between items-center px-1">
                            <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Total Transaction</span>
                            <span className="text-xl font-black text-primary italic">
                                ${total.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button 
                                onClick={() => {
                                    const dropdown = document.activeElement;
                                    if (dropdown) dropdown.blur();
                                    window.location.href = '/basket';
                                }}
                                className="btn btn-ghost btn-sm w-full rounded-xl font-black uppercase tracking-widest text-[10px] border border-white/5 hover:bg-white/5"
                            >
                                View Full Basket
                            </button>
                            <button 
                                disabled={cartItems.length === 0}
                                className="btn btn-primary btn-sm w-full rounded-xl font-black uppercase tracking-widest text-[10px] shadow-[0_0_15px_rgba(0,243,255,0.3)] disabled:opacity-20"
                            >
                                Commit Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

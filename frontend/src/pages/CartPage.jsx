import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaShieldAlt, FaCreditCard } from 'react-icons/fa'

const CartPage = () => {
    const navigate = useNavigate()
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
        window.dispatchEvent(new Event('cartUpdate'))
    }

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        loadCart()
        window.dispatchEvent(new Event('cartUpdate'))
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-base-100 page-transition">
                <div className="w-24 h-24 bg-neutral/30 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                    <FaShoppingBag className="text-4xl text-gray-700" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-white mb-2 italic">Basket Empty</h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">No neural components detected in current session.</p>
                <button 
                    onClick={() => navigate('/')}
                    className="btn btn-primary px-10 rounded-2xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                >
                    Browse Marketplace
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-6 md:p-12 bg-base-100 page-transition">
            <header className="max-w-7xl mx-auto mb-12">
                <button 
                    onClick={() => navigate(-1)}
                    className="btn btn-ghost gap-2 mb-6 hover:bg-white/5 rounded-xl uppercase font-black tracking-widest text-[10px]"
                >
                    <FaArrowLeft /> Resume Shopping
                </button>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/20 rounded-2xl border border-accent/30 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                        <FaShoppingBag className="text-3xl text-accent" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
                            Neural <span className="text-accent">Basket</span>
                        </h1>
                        <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                            Deployment Queue for {cartItems.length} Components
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-neutral/40 border border-white/5 backdrop-blur-md rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 group hover:border-primary/20 transition-all duration-300">
                            <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden bg-base-300 shrink-0 border border-white/5">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-700 font-bold italic">No Visual Data</div>
                                )}
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-between py-2">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <Link to={`/product/${item.id}`} className="text-2xl font-black uppercase tracking-tight text-white hover:text-primary transition-colors">
                                            {item.name}
                                        </Link>
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="btn btn-ghost btn-circle btn-sm text-gray-600 hover:text-error hover:bg-error/10"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-[10px] uppercase font-black text-gray-500 bg-white/5 px-2 py-0.5 rounded">Condition: {item.product_condition}</span>
                                        <span className="text-[10px] uppercase font-black text-gray-500 bg-white/5 px-2 py-0.5 rounded">Vendor: {item.seller_name}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-white/5">
                                    <div className="flex items-center bg-base-300/80 rounded-xl border border-white/10 p-1">
                                        <button 
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="btn btn-ghost btn-xs sm:btn-sm text-lg font-black hover:text-primary"
                                        >-</button>
                                        <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                                        <button 
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="btn btn-ghost btn-xs sm:btn-sm text-lg font-black hover:text-primary"
                                        >+</button>
                                    </div>
                                    
                                    <div className="text-right">
                                        <span className="text-[9px] uppercase font-black text-gray-500 block">Unit Subtotal</span>
                                        <span className="text-xl font-black text-primary italic">
                                            ${(item.price_cop * item.quantity).toLocaleString()} COP
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-neutral/40 border border-white/5 backdrop-blur-md rounded-[2.5rem] p-8 sticky top-28 shadow-2xl">
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8 italic flex items-center gap-3">
                            Registry <span className="text-primary">Summary</span>
                        </h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                <span>Subtotal Components</span>
                                <span className="text-white">${total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                <span>Neural Tax (0%)</span>
                                <span className="text-white">$0</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                <span>Network Protocol</span>
                                <span className="text-success">Secured</span>
                            </div>
                            <div className="divider opacity-5"></div>
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em]">Total Transaction</span>
                                <span className="text-3xl font-black text-primary italic leading-none">${total.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button className="btn btn-primary w-full h-16 rounded-[1.25rem] font-black uppercase tracking-widest shadow-[0_0_25px_rgba(0,243,255,0.3)] gap-3 group">
                                <FaCreditCard className="group-hover:scale-110 transition-transform" />
                                Commit Payment
                            </button>
                            
                            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex items-start gap-3">
                                <FaShieldAlt className="text-primary shrink-0 mt-0.5" />
                                <p className="text-[9px] uppercase font-bold text-gray-500 leading-tight">
                                    Encrypted transaction via Shoply-Protocol. <br />
                                    Buyer protection active for this deployment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage

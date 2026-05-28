import { useEffect, useState } from 'react'
import { FaTrash, FaCreditCard, FaLock } from 'react-icons/fa'
import { getCart, removeFromCart, checkout } from '../services/shopService'
import { useNavigate } from 'react-router'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)
    const navigate = useNavigate()

    const fetchCart = async () => {
        try {
            const data = await getCart()
            setCartItems(data)
        } catch (error) {
            console.error('Error fetching cart:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const handleRemove = async (id) => {
        try {
            await removeFromCart(id)
            fetchCart()
        } catch (error) {
            alert(error.message)
        }
    }

    const handleCheckout = async () => {
        setProcessing(true)
        try {
            const result = await checkout()
            alert(`Payment Simulated! Order ID: ${result.orderId}. Total: $${result.total}`)
            setCartItems([])
            navigate('/')
        } catch (error) {
            alert(error.message)
        } finally {
            setProcessing(false)
        }
    }

    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

    if (loading) return <div className="p-20 text-center"><span className="loading loading-spinner text-primary"></span></div>

    return (
        <div className="container mx-auto px-4 py-20 page-transition">
            <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-12">
                Cart <span className="text-primary">Terminal</span>
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="p-12 bg-neutral/20 border border-white/5 rounded-[2rem] text-center">
                            <p className="text-gray-500 uppercase tracking-widest font-bold">Your manifest is empty</p>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-center gap-6 p-6 bg-neutral/30 border border-white/5 rounded-3xl hover:border-primary/20 transition-all">
                                <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded-2xl" />
                                <div className="flex-1">
                                    <h3 className="text-xl font-black uppercase tracking-tight">{item.name}</h3>
                                    <p className="text-gray-500 font-bold">${item.price} x {item.quantity}</p>
                                </div>
                                <button 
                                    onClick={() => handleRemove(item.id)}
                                    className="p-4 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="bg-neutral/40 border border-white/10 p-8 rounded-[2rem] h-fit sticky top-24">
                    <h2 className="text-2xl font-black uppercase mb-6 tracking-tight">Summary</h2>
                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Network Fee</span>
                            <span className="text-primary">FREE</span>
                        </div>
                        <div className="h-px bg-white/10 my-4"></div>
                        <div className="flex justify-between text-2xl font-black">
                            <span>Total</span>
                            <span className="text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button 
                        disabled={cartItems.length === 0 || processing}
                        onClick={handleCheckout}
                        className="btn btn-primary w-full rounded-xl h-14 font-black uppercase tracking-widest gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                    >
                        {processing ? <span className="loading loading-spinner"></span> : <><FaCreditCard /> Execute Payment</>}
                    </button>
                    
                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-black">
                        <FaLock className="text-primary" /> Secure Neon Encryption
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

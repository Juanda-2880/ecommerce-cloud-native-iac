import { useEffect, useState } from 'react'
import { getOrderHistory } from '../services/orderService'
import { FaHistory, FaBox, FaClock, FaCheckCircle, FaArrowLeft, FaReceipt } from 'react-icons/fa'
import { useNavigate } from 'react-router'

const OrderHistory = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        // Clear cart if returning from a successful MercadoPago payment
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        if (status === 'approved' || status === 'success') {
            localStorage.removeItem('cart');
            window.dispatchEvent(new Event('cartUpdate'));
            // Optional: remove query params from URL so it doesn't trigger again on refresh
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        const fetchOrders = async () => {
            try {
                const data = await getOrderHistory()
                setOrders(data)
            } catch (error) {
                console.error('Error fetching order history:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [])

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
    )

    return (
        <div className="min-h-screen p-6 md:p-12 bg-base-100 page-transition">
            <header className="max-w-5xl mx-auto mb-12">
                <button 
                    onClick={() => navigate(-1)}
                    className="btn btn-ghost gap-2 mb-6 hover:bg-white/5 rounded-xl uppercase font-black tracking-widest text-[10px]"
                >
                    <FaArrowLeft /> Back
                </button>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                        <FaReceipt className="text-3xl text-primary" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter uppercase italic text-white">
                            Purchase <span className="text-primary">History</span>
                        </h1>
                        <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                            View and manage your past transactions
                        </p>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto space-y-8">
                {orders.length === 0 ? (
                    <div className="bg-neutral/20 border border-white/5 rounded-[3rem] p-20 text-center border-dashed border-2">
                        <FaHistory className="text-6xl text-gray-700 mx-auto mb-6" />
                        <h3 className="text-2xl font-black uppercase text-white mb-2">No Orders Found</h3>
                        <p className="text-gray-500 uppercase font-bold tracking-widest text-xs">Your transaction history is currently empty.</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="bg-neutral/40 border border-white/5 backdrop-blur-md rounded-[2rem] overflow-hidden hover:border-primary/20 transition-all duration-300">
                            <div className="p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row justify-between gap-4 bg-white/5">
                                <div className="flex flex-wrap gap-6 md:gap-12">
                                    <div>
                                        <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest block mb-1">Order ID</span>
                                        <span className="text-sm font-mono text-white">#ORD-{order.id.toString().padStart(6, '0')}</span>
                                    </div>
                                    <div>
                                        <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest block mb-1">Date</span>
                                        <span className="text-sm font-bold text-white uppercase">{new Date(order.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="text-[9px] uppercase font-black text-gray-500 tracking-widest block mb-1">Total Amount</span>
                                        <span className="text-sm font-black text-primary">${Number(order.total_amount).toLocaleString()} COP</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                        order.status === 'completed' ? 'bg-success/20 text-success border border-success/30' : 'bg-warning/20 text-warning border border-warning/30'
                                    }`}>
                                        {order.status === 'completed' ? <FaCheckCircle /> : <FaClock />}
                                        {order.status}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6 md:p-8 space-y-4">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-6 group">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-base-300 border border-white/5 shrink-0">
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-700 italic font-bold">N/A</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-black uppercase text-white truncate">{item.product_name}</h4>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Quantity: {item.quantity} × ${Number(item.price).toLocaleString()}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="text-xs font-black text-white italic">${(item.quantity * item.price).toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default OrderHistory

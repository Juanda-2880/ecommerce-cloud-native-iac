import { useEffect, useState } from 'react'
import { FaStore, FaBoxOpen, FaChartLine, FaWallet } from 'react-icons/fa'

const SellerDashboard = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const stats = [
        { label: 'Active Products', value: '0', icon: <FaBoxOpen />, color: 'text-primary' },
        { label: 'Total Sales', value: '$0.00', icon: <FaChartLine />, color: 'text-secondary' },
        { label: 'Wallet Balance', value: '$0.00', icon: <FaWallet />, color: 'text-accent' },
    ]

    return (
        <div className="min-h-screen p-6 page-transition">
            <header className="mb-10">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-secondary/20 rounded-2xl border border-secondary/30 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                        <FaStore className="text-3xl text-secondary" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                            Seller <span className="text-secondary">Nexus</span>
                        </h1>
                        <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                            Operational Terminal for {user?.username}
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-neutral/40 border border-white/5 backdrop-blur-md p-6 rounded-3xl hover:border-primary/20 transition-all duration-300 group">
                        <div className={`text-2xl ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <div className="text-3xl font-black mb-1 tracking-tighter">
                            {stat.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-neutral/40 border border-white/5 backdrop-blur-md rounded-3xl p-10 text-center border-dashed border-2 border-primary/20">
                <div className="max-w-md mx-auto">
                    <FaBoxOpen className="text-6xl text-primary/20 mx-auto mb-6" />
                    <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Your Inventory is Empty</h2>
                    <p className="text-gray-500 text-sm mb-8">Ready to start your neon empire? Initialize your first product deployment.</p>
                    <button className="btn btn-primary px-10 rounded-xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.3)]">
                        Initialize Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SellerDashboard

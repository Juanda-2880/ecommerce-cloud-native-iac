import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getAllProducts } from '../services/productService'
import { FaSearch, FaArrowRight, FaUser, FaTag } from 'react-icons/fa'
import heroImage from '../assets/hero.png'

const Home = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async (search = '') => {
        setLoading(true)
        try {
            const data = await getAllProducts({ search })
            setProducts(data)
        } catch (error) {
            console.error('Error fetching marketplace:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        fetchProducts(searchQuery)
    }

    return (
        <div className="min-h-screen bg-base-100 page-transition">
            {/* Hero Section */}
            <section className="relative h-[60vh] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-base-100 via-base-100/80 to-transparent z-10"></div>
                <img src={heroImage} alt="Cyberpunk City" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                
                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
                        <span className="text-[10px] uppercase font-black tracking-[0.5em] text-primary">Neural Marketplace v2.0</span>
                    </div>
                    <h1 className="text-7xl font-black uppercase tracking-tighter text-white mb-6 italic leading-none">
                        GEAR UP FOR THE <br />
                        <span className="text-primary drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">NEXT FRONTIER</span>
                    </h1>
                    <p className="max-w-xl text-gray-400 font-bold text-lg uppercase tracking-tight mb-8">
                        The ultimate decentralized node for high-end tech, 
                        black-market components, and cybernetic enhancements.
                    </p>

                    <form onSubmit={handleSearch} className="max-w-2xl relative group">
                        <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-primary text-xl transition-all group-focus-within:scale-125" />
                        <input 
                            type="text" 
                            placeholder="SCAN THE REGISTRY FOR COMPONENTS..." 
                            className="input input-bordered w-full h-16 pl-16 pr-32 bg-neutral/80 backdrop-blur-md border-primary/20 rounded-2xl focus:border-primary font-black uppercase tracking-widest text-xs shadow-2xl"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-primary px-8 rounded-xl font-black uppercase tracking-widest text-[10px] h-10 min-h-0">
                            Search
                        </button>
                    </form>
                </div>
            </section>

            {/* Marketplace Grid */}
            <section className="container mx-auto px-6 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-white italic">Active <span className="text-secondary">Deployments</span></h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Real-time synchronization with seller nodes</p>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 bg-neutral/30 px-4 py-2 rounded-full border border-white/5">
                        {products.length} Items Found
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[1, 2, 4, 8].map(i => (
                            <div key={i} className="h-[450px] bg-neutral/20 rounded-[2.5rem] animate-pulse border border-white/5"></div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="bg-neutral/20 border border-white/5 rounded-[3rem] p-20 text-center border-dashed border-2">
                        <FaSearch className="text-6xl text-gray-700 mx-auto mb-6" />
                        <h3 className="text-2xl font-black uppercase text-white mb-2">Registry Empty</h3>
                        <p className="text-gray-500 uppercase font-bold tracking-widest text-xs">No components match your search parameters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="group bg-neutral/40 border border-white/5 backdrop-blur-md rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 cursor-pointer shadow-xl hover:shadow-primary/10"
                            >
                                <div className="h-64 bg-base-300 relative overflow-hidden">
                                    {product.image_url ? (
                                        <img 
                                            src={product.image_url} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700 italic font-bold">No visual data</div>
                                    )}
                                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-primary/20">
                                        {product.product_condition}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                        <button className="btn btn-primary w-full rounded-xl font-black uppercase tracking-widest text-[10px] gap-2">
                                            View Details <FaArrowRight className="text-[10px]" />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors truncate pr-2">
                                            {product.name}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-6 line-clamp-2 leading-relaxed">
                                        {product.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center">
                                            <FaUser className="text-[10px] text-secondary" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{product.seller_name}</span>
                                    </div>

                                    <div className="flex justify-between items-end border-t border-white/5 pt-4">
                                        <div className="text-2xl font-black text-white italic">
                                            ${Number(product.price_cop).toLocaleString()}
                                            <span className="text-[10px] ml-1 text-primary">COP</span>
                                        </div>
                                        <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                                            QTY: {product.quantity}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Home

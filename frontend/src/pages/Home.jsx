import { useEffect, useState } from 'react'
import { FaRocket, FaShieldAlt, FaBolt, FaStar, FaShoppingCart } from 'react-icons/fa'
import { Link } from 'react-router'
import { getProducts, addToCart } from '../services/shopService'

const Home = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId)
            alert('Added to cart!')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="page-transition space-y-20 pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-20 pb-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 animate-fade-in">
                        <FaBolt className="animate-pulse" /> Next-Gen Commerce
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic mb-6 leading-none">
                        Warp into the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent drop-shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                            Future
                        </span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-gray-400 text-lg mb-12 font-medium tracking-tight">
                        Experience the first cloud-native terminal for high-performance trading. 
                        Join the <span className="text-white font-bold">Neon Revolution</span> with Shoply.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/signup" className="btn btn-primary px-12 rounded-xl font-black uppercase tracking-widest h-14 shadow-[0_0_25px_rgba(0,243,255,0.4)] hover:scale-105 transition-all">
                            Initialize Account
                        </Link>
                        <a href="#inventory" className="btn btn-outline border-white/10 px-12 rounded-xl font-black uppercase tracking-widest h-14 hover:bg-white/5">
                            Browse Inventory
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <FaRocket />, title: 'Hyper Speed', desc: 'Zero-latency transactions powered by edge computing.' },
                        { icon: <FaShieldAlt />, title: 'Void Guard', desc: 'End-to-end encryption for every packet of data.' },
                        { icon: <FaStar />, title: 'Elite Tier', desc: 'Exclusive access to experimental hardware releases.' }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 bg-neutral/30 rounded-3xl border border-white/5 backdrop-blur-sm hover:border-primary/20 transition-colors group">
                            <div className="text-3xl text-primary mb-6 group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-2">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Grid */}
            <section id="inventory" className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase italic">Operational <span className="text-primary">Inventory</span></h2>
                        <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-bold">Latest Operational Tech</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center p-20">
                        <span className="loading loading-orbit loading-lg text-primary"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product.id} className="group relative p-4 bg-neutral/40 rounded-[2rem] border border-white/5 hover:border-primary/40 transition-all duration-500">
                                <div className="aspect-square bg-neutral rounded-2xl mb-4 overflow-hidden relative">
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>
                                    <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[8px] font-black uppercase tracking-widest text-white border border-white/10">
                                        HARDWARE
                                    </div>
                                </div>
                                <h3 className="font-black uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
                                <p className="text-xs text-gray-500 mb-2 line-clamp-2">{product.description}</p>
                                <p className="text-2xl font-black tracking-tighter text-white">${product.price}</p>
                                
                                <button 
                                    onClick={() => handleAddToCart(product.id)}
                                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-neutral hover:border-primary transition-all shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                >
                                    <FaShoppingCart />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-4 py-20">
                <div className="bg-gradient-to-br from-neutral/60 to-base-100 p-12 md:p-20 rounded-[3rem] border border-white/5 text-center relative overflow-hidden">
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] animate-pulse"></div>
                    
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic mb-8">
                        Ready to <span className="text-secondary">Execute</span>?
                    </h2>
                    <p className="max-w-xl mx-auto text-gray-400 mb-12">
                        Don't just watch the future. Own it. Create your terminal account and start trading in the neon ecosystem today.
                    </p>
                    <Link to="/signup" className="btn btn-secondary px-12 rounded-xl font-black uppercase tracking-widest h-14 shadow-[0_0_25px_rgba(255,0,255,0.3)]">
                        Initialize Deployment
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getProductById } from '../services/productService'
import { FaTag, FaBox, FaUser, FaHistory, FaShoppingCart, FaArrowLeft, FaCheck } from 'react-icons/fa'

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [quantity, setQuantity] = useState(1)
    const [user, setUser] = useState(null)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) setUser(JSON.parse(storedUser))
        
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id)
                setProduct(data)
            } catch (error) {
                console.error('Error fetching product:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    const addToCart = () => {
        if (!user) {
            navigate('/login')
            return
        }

        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const existingIndex = cart.findIndex(item => item.id === product.id)
        
        if (existingIndex > -1) {
            cart[existingIndex].quantity += quantity
        } else {
            cart.push({ ...product, quantity })
        }
        
        localStorage.setItem('cart', JSON.stringify(cart))
        window.dispatchEvent(new Event('cartUpdate'))
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-base-100">
            <span className="loading loading-cipher text-primary loading-lg"></span>
        </div>
    )

    if (!product) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 gap-4">
            <h1 className="text-4xl font-black uppercase text-error">Data Corrupted</h1>
            <p className="text-gray-500 font-bold uppercase tracking-widest">Target item not found in registry.</p>
            <button onClick={() => navigate('/')} className="btn btn-primary rounded-xl font-black uppercase tracking-widest">
                Return to Home
            </button>
        </div>
    )

    return (
        <div className="min-h-screen p-6 bg-base-100 page-transition">
            <button 
                onClick={() => navigate(-1)}
                className="btn btn-ghost gap-2 mb-8 hover:bg-white/5 rounded-xl uppercase font-black tracking-widest text-xs"
            >
                <FaArrowLeft /> Back to Inventory
            </button>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Media Section */}
                <div className="space-y-6">
                    <div className="aspect-square bg-neutral/40 rounded-[3rem] border border-white/5 overflow-hidden group shadow-2xl relative">
                        {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-700 italic text-xl">Image asset unavailable</div>
                        )}
                        <div className="absolute top-8 left-8 flex gap-3">
                            <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {product.product_condition}
                            </span>
                            {product.is_negotiable && (
                                <span className="bg-accent/20 backdrop-blur-md border border-accent/30 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    Negotiable
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-12 h-1 bg-primary rounded-full"></div>
                            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-500">Registry ID: {product.id.toString().padStart(6, '0')}</span>
                        </div>
                        <h1 className="text-6xl font-black uppercase tracking-tighter text-white mb-2 italic">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-3 text-secondary group cursor-pointer">
                            <FaUser className="text-sm" />
                            <span className="font-bold uppercase tracking-widest text-xs group-hover:underline">Manufacturer: {product.seller_name}</span>
                        </div>
                    </div>

                    <div className="bg-neutral/30 border border-white/5 backdrop-blur-md p-8 rounded-[2rem] mb-8 space-y-6">
                        <div>
                            <span className="text-[10px] uppercase font-black tracking-widest text-gray-500 block mb-2">Technical Description</span>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {product.description || 'No technical logs provided for this component.'}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 bg-base-300/50 rounded-2xl border border-white/5">
                                <span className="text-[10px] uppercase font-black text-gray-500 block mb-1">Available Units</span>
                                <div className="text-2xl font-black text-white">{product.quantity}</div>
                            </div>
                            <div className="p-4 bg-base-300/50 rounded-2xl border border-white/5">
                                <span className="text-[10px] uppercase font-black text-gray-500 block mb-1">Condition</span>
                                <div className="text-2xl font-black text-white uppercase">{product.product_condition}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 p-8 bg-primary/5 border border-primary/20 rounded-[2.5rem] shadow-[0_0_30px_rgba(0,243,255,0.05)]">
                        <div className="flex-1">
                            <span className="text-[10px] uppercase font-black tracking-widest text-primary/70 block mb-1">Market Value</span>
                            <div className="text-5xl font-black text-primary italic">
                                ${Number(product.price_cop).toLocaleString()} <span className="text-lg">COP</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 w-full sm:w-auto">
                            <div className="flex items-center bg-base-300/80 rounded-xl border border-white/10 p-1">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="btn btn-ghost btn-sm text-lg font-black"
                                >-</button>
                                <span className="w-12 text-center font-black">{quantity}</span>
                                <button 
                                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                    className="btn btn-ghost btn-sm text-lg font-black"
                                >+</button>
                            </div>
                            
                            <button 
                                onClick={addToCart}
                                disabled={added || product.quantity === 0}
                                className={`btn ${added ? 'btn-success' : 'btn-primary'} btn-lg rounded-2xl font-black uppercase tracking-widest gap-3 shadow-[0_0_20px_rgba(0,243,255,0.3)] min-w-[200px] transition-all duration-300`}
                            >
                                {added ? (
                                    <><FaCheck /> Integrated</>
                                ) : (
                                    <><FaShoppingCart /> Add to Cart</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail

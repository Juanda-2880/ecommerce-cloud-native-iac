import { useEffect, useState } from 'react'
import { FaStore, FaBoxOpen, FaChartLine, FaWallet, FaPlus, FaSearch, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa'
import { getSellerProducts, createProduct, updateProduct, deleteProduct } from '../services/productService'

const SellerDashboard = () => {
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const [filters, setFilters] = useState({ search: '', is_published: undefined })
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price_cop: '',
        is_negotiable: false,
        image_url: '',
        is_published: true
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        if (user) {
            fetchProducts()
        }
    }, [user, filters])

    const fetchProducts = async () => {
        try {
            const data = await getSellerProducts(filters)
            setProducts(data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, formData)
            } else {
                await createProduct(formData)
            }
            setIsModalOpen(false)
            setEditingProduct(null)
            setFormData({
                name: '',
                description: '',
                price_cop: '',
                is_negotiable: false,
                image_url: '',
                is_published: true
            })
            fetchProducts()
        } catch (error) {
            console.error('Error saving product:', error)
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            description: product.description,
            price_cop: product.price_cop,
            is_negotiable: product.is_negotiable === 1 || product.is_negotiable === true,
            image_url: product.image_url,
            is_published: product.is_published === 1 || product.is_published === true
        })
        setIsModalOpen(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id)
                fetchProducts()
            } catch (error) {
                console.error('Error deleting product:', error)
            }
        }
    }

    const stats = [
        { label: 'Active Products', value: products.filter(p => p.is_published).length, icon: <FaBoxOpen />, color: 'text-primary' },
        { label: 'Total Sales', value: '$0.00', icon: <FaChartLine />, color: 'text-secondary' },
        { label: 'Wallet Balance', value: '$0.00', icon: <FaWallet />, color: 'text-accent' },
    ]

    return (
        <div className="min-h-screen p-6 page-transition bg-base-100">
            <header className="mb-10 flex justify-between items-center">
                <div className="flex items-center gap-4">
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
                <button 
                    onClick={() => {
                        setEditingProduct(null)
                        setFormData({ name: '', description: '', price_cop: '', is_negotiable: false, image_url: '', is_published: true })
                        setIsModalOpen(true)
                    }}
                    className="btn btn-primary gap-2 rounded-xl font-black uppercase tracking-widest shadow-[0_0_15px_rgba(0,243,255,0.3)]"
                >
                    <FaPlus /> Deploy New Item
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-neutral/40 border border-white/5 backdrop-blur-md p-6 rounded-3xl hover:border-primary/20 transition-all duration-300 group">
                        <div className={`text-2xl ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <div className="text-3xl font-black mb-1 tracking-tighter text-white">
                            {stat.value}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-8 flex flex-col md:flex-row gap-4 items-center bg-neutral/30 p-4 rounded-2xl border border-white/5">
                <div className="relative flex-1 w-full">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search your inventory..." 
                        className="input input-bordered w-full pl-12 bg-base-200/50 border-white/10 focus:border-primary rounded-xl"
                        value={filters.search}
                        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    />
                </div>
                <select 
                    className="select select-bordered bg-base-200/50 border-white/10 focus:border-primary rounded-xl"
                    value={filters.is_published === undefined ? '' : filters.is_published}
                    onChange={(e) => setFilters(prev => ({ ...prev, is_published: e.target.value === '' ? undefined : e.target.value === 'true' }))}
                >
                    <option value="">All Status</option>
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                </select>
            </div>

            {products.length === 0 ? (
                <div className="bg-neutral/40 border border-white/5 backdrop-blur-md rounded-3xl p-10 text-center border-dashed border-2 border-primary/20">
                    <div className="max-w-md mx-auto">
                        <FaBoxOpen className="text-6xl text-primary/20 mx-auto mb-6" />
                        <h2 className="text-2xl font-black mb-2 uppercase tracking-tight text-white">Your Inventory is Empty</h2>
                        <p className="text-gray-500 text-sm mb-8">Ready to start your neon empire? Initialize your first product deployment.</p>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-primary px-10 rounded-xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                        >
                            Initialize Product
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-neutral/40 border border-white/5 backdrop-blur-md rounded-3xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
                            <div className="h-48 bg-base-300 relative">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-600 italic">No image provided</div>
                                )}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.is_published ? 'bg-success/20 text-success border border-success/30' : 'bg-warning/20 text-warning border border-warning/30'}`}>
                                    {product.is_published ? 'Published' : 'Draft'}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-black mb-1 uppercase tracking-tight text-white">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Price (COP)</div>
                                        <div className="text-2xl font-black text-primary">${Number(product.price_cop).toLocaleString()}</div>
                                    </div>
                                    {product.is_negotiable && (
                                        <div className="text-[10px] uppercase tracking-widest text-accent font-black bg-accent/10 px-2 py-1 rounded">Negotiable</div>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleEdit(product)}
                                        className="btn btn-ghost flex-1 border border-white/5 hover:bg-white/5 rounded-xl text-white"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="btn btn-ghost border border-error/20 text-error hover:bg-error/10 rounded-xl"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-base-300/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="bg-neutral-focus w-full max-w-2xl rounded-3xl border border-primary/20 shadow-2xl relative z-10 overflow-hidden">
                        <div className="p-8 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-2xl font-black uppercase tracking-tighter">
                                {editingProduct ? 'Update' : 'Deploy'} <span className="text-primary">Component</span>
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <FaTimes className="text-xl" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="form-control">
                                    <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">Item Name</label>
                                    <input 
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="input input-bordered bg-base-200 border-white/10 rounded-xl focus:border-primary" 
                                        placeholder="e.g. Cyber Deck X-1"
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">Price (COP)</label>
                                    <input 
                                        type="number"
                                        name="price_cop"
                                        value={formData.price_cop}
                                        onChange={handleInputChange}
                                        required
                                        className="input input-bordered bg-base-200 border-white/10 rounded-xl focus:border-primary" 
                                        placeholder="0.00"
                                    />
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">Description</label>
                                    <textarea 
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="textarea textarea-bordered h-24 bg-base-200 border-white/10 rounded-xl focus:border-primary" 
                                        placeholder="Detail the technical specifications..."
                                    ></textarea>
                                </div>
                                <div className="form-control md:col-span-2">
                                    <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">Image URL</label>
                                    <input 
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-base-200 border-white/10 rounded-xl focus:border-primary" 
                                        placeholder="https://images.com/product.jpg"
                                    />
                                </div>
                                <div className="flex items-center gap-6 md:col-span-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            name="is_negotiable"
                                            checked={formData.is_negotiable}
                                            onChange={handleInputChange}
                                            className="checkbox checkbox-primary rounded-md" 
                                        />
                                        <span className="text-[10px] uppercase tracking-widest font-black text-gray-500 group-hover:text-primary transition-colors">Negotiable</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            name="is_published"
                                            checked={formData.is_published}
                                            onChange={handleInputChange}
                                            className="checkbox checkbox-secondary rounded-md" 
                                        />
                                        <span className="text-[10px] uppercase tracking-widest font-black text-gray-500 group-hover:text-secondary transition-colors">Published Immediately</span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost flex-1 rounded-xl uppercase font-black tracking-widest">Cancel</button>
                                <button type="submit" className="btn btn-primary flex-[2] rounded-xl uppercase font-black tracking-widest shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                                    {editingProduct ? 'Update Deployment' : 'Confirm Deployment'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SellerDashboard

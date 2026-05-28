import { useEffect, useState } from 'react'
import { FaUserShield, FaKey, FaTrashAlt, FaSave, FaExclamationTriangle, FaCheckCircle, FaUser } from 'react-icons/fa'
import { UpdateProfileService, DeleteAccountService } from '../services/authService'
import { useNavigate } from 'react-router'

const AccountSettings = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            setUser(parsedUser)
            setFormData(prev => ({
                ...prev,
                username: parsedUser.username,
                email: parsedUser.email
            }))
        }
    }, [])

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 5000)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        
        if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            showNotification('New passwords do not match', 'error')
            return
        }

        setIsLoading(true)
        try {
            const response = await UpdateProfileService({
                username: formData.username,
                email: formData.email,
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword
            })
            showNotification(response.message)
            setUser(response.user)
            setFormData(prev => ({ ...prev, oldPassword: '', newPassword: '', confirmPassword: '' }))
        } catch (error) {
            showNotification(error.message, 'error')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDeleteAccount = async () => {
        if (window.confirm('WARNING: IRREVERSIBLE ACTION. This will permanently delete your identity and all associated data from the network. Proceed?')) {
            try {
                await DeleteAccountService()
                navigate('/login')
                window.location.reload()
            } catch (error) {
                showNotification(error.message, 'error')
            }
        }
    }

    return (
        <div className="min-h-screen p-6 page-transition bg-base-100">
            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-24 right-6 z-[200] p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-center gap-3 animate-bounce-short ${notification.type === 'success' ? 'bg-success/20 border-success text-success' : 'bg-error/20 border-error text-error'}`}>
                    {notification.type === 'success' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                    <span className="font-black uppercase tracking-tight text-xs">{notification.message}</span>
                </div>
            )}

            <header className="mb-10 flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                    <FaUserShield className="text-3xl text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase italic">
                        Account <span className="text-primary">Settings</span>
                    </h1>
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">
                        Security & Identity Configuration Terminal
                    </p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Overview */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-neutral/40 border border-white/5 backdrop-blur-md p-8 rounded-3xl text-center">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full border-4 border-primary/20 p-1">
                            <div className="w-full h-full bg-primary/10 rounded-full flex items-center justify-center text-4xl text-primary">
                                <FaUser />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-white">{user?.username}</h2>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6">{user?.role} Tier</p>
                        <div className="bg-base-300/50 p-4 rounded-2xl border border-white/5 text-left">
                            <div className="text-[10px] uppercase font-black text-gray-500 mb-1">Network Identity</div>
                            <div className="text-sm font-mono text-primary truncate">{user?.email}</div>
                        </div>
                    </div>

                    <div className="bg-error/10 border border-error/20 p-6 rounded-3xl group hover:border-error transition-all cursor-pointer" onClick={handleDeleteAccount}>
                        <div className="flex items-center gap-4 text-error">
                            <FaTrashAlt className="text-xl group-hover:scale-110 transition-transform" />
                            <div>
                                <h3 className="font-black uppercase tracking-tight leading-none mb-1">Self-Destruct</h3>
                                <p className="text-[10px] uppercase font-bold opacity-70">Delete Account Permanently</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <form onSubmit={handleUpdateProfile} className="bg-neutral/40 border border-white/5 backdrop-blur-md p-8 rounded-3xl space-y-8">
                        <section>
                            <h3 className="text-lg font-black uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-primary rounded-full"></div>
                                Identity Coordinates
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">Username</label>
                                    <input 
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-base-200/50 border-white/10 rounded-xl focus:border-primary font-bold" 
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">Email Address</label>
                                    <input 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="input input-bordered bg-base-200/50 border-white/10 rounded-xl focus:border-primary font-mono" 
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="divider opacity-5"></div>

                        <section>
                            <h3 className="text-lg font-black uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-accent rounded-full"></div>
                                Cryptographic Access
                            </h3>
                            <div className="space-y-6">
                                <div className="form-control">
                                    <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">Current Password (Required for changes)</label>
                                    <div className="relative">
                                        <FaKey className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                                        <input 
                                            type="password"
                                            name="oldPassword"
                                            value={formData.oldPassword}
                                            onChange={handleInputChange}
                                            className="input input-bordered w-full pl-12 bg-base-200/50 border-white/10 rounded-xl focus:border-accent" 
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">New Password</label>
                                        <input 
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleInputChange}
                                            className="input input-bordered bg-base-200/50 border-white/10 rounded-xl focus:border-accent" 
                                            placeholder="Leave blank to keep current"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label uppercase tracking-widest text-[10px] font-black text-gray-500">Confirm New Password</label>
                                        <input 
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="input input-bordered bg-base-200/50 border-white/10 rounded-xl focus:border-accent" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className={`btn btn-primary w-full rounded-2xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(0,243,255,0.3)] gap-2 h-14 ${isLoading ? 'loading' : ''}`}
                        >
                            {!isLoading && <FaSave className="text-xl" />}
                            Commit Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings

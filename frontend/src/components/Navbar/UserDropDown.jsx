import profileImage from '../../assets/profile.png'
import { LogoutService } from '../../services/authService'
import { useNavigate } from 'react-router'
import { FaUserCog, FaStore, FaShoppingBag, FaSignOutAlt, FaUser } from 'react-icons/fa'

const UserDropDown = ({ user }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        LogoutService()
        navigate('/login')
        window.location.reload()
    }

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-primary/30 hover:border-primary transition-all shadow-[0_0_15px_rgba(0,243,255,0.2)] hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] active:scale-90"
            >
                <div className="w-10 rounded-full">
                    <img src={profileImage} alt="Avatar" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 z-[100] p-2 shadow-[0_10px_40px_rgba(0,0,0,0.5)] bg-neutral/95 backdrop-blur-xl rounded-2xl w-64 border border-white/10"
            >
                <li className="px-4 py-3 flex flex-col gap-1">
                    <span className="text-primary font-black tracking-tighter text-lg uppercase italic leading-none">
                        {user?.username}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">
                        Authenticated {user?.role}
                    </span>
                </li>
                
                <div className="divider my-0 opacity-10"></div>
                
                {user?.role === 'salesperson' && (
                    <li>
                        <button 
                            onClick={() => navigate('/seller-dashboard')}
                            className="hover:text-secondary hover:bg-secondary/5 transition-all py-3 px-4 flex items-center gap-3 group"
                        >
                            <FaStore className="text-secondary group-hover:scale-110 transition-transform" />
                            <span className="font-bold uppercase tracking-widest text-[11px]">Seller Dashboard</span>
                        </button>
                    </li>
                )}

                <li>
                    <button 
                        onClick={() => navigate('/account-settings')}
                        className="hover:text-primary hover:bg-primary/5 transition-all py-3 px-4 flex items-center gap-3 group"
                    >
                        <FaUserCog className="text-primary group-hover:rotate-45 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-[11px]">Account Settings</span>
                    </button>
                </li>

                <li>
                    <button 
                        onClick={() => navigate('/order-history')}
                        className="hover:text-accent hover:bg-accent/5 transition-all py-3 px-4 flex items-center gap-3 group"
                    >
                        <FaShoppingBag className="text-accent group-hover:scale-110 transition-transform" />
                        <span className="font-bold uppercase tracking-widest text-[11px]">My Orders</span>
                    </button>
                </li>

                <div className="divider my-0 opacity-10"></div>
                
                <li>
                    <button 
                        onClick={handleLogout} 
                        className="text-error font-black hover:bg-error/10 transition-all py-4 px-4 flex items-center gap-3 group"
                    >
                        <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-[11px]">Disconnect Session</span>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default UserDropDown

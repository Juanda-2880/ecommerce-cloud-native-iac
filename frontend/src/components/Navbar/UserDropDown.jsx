import profileImage from '../../assets/profile.png'
import { LogoutService } from '../../services/authService'
import { useNavigate } from 'react-router'

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
                className="btn btn-ghost btn-circle avatar border border-primary/30 hover:border-primary transition-all shadow-[0_0_10px_rgba(0,243,255,0.2)]"
            >
                <div className="w-10 rounded-full">
                    <img src={profileImage} alt="Avatar" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-neutral/95 backdrop-blur-lg rounded-xl w-52 border border-primary/20"
            >
                <li className="menu-title text-primary font-black tracking-widest text-xs uppercase px-4 py-2 opacity-70">
                    Welcome, {user?.username}
                </li>
                <div className="divider my-0 opacity-20"></div>
                {user?.role === 'salesperson' && (
                    <li>
                        <button 
                            onClick={() => navigate('/seller-dashboard')}
                            className="text-secondary font-bold hover:bg-secondary/10 transition-all py-3 px-4 flex items-center gap-2"
                        >
                            Seller Dashboard
                        </button>
                    </li>
                )}
                <li><a className="hover:text-primary transition-colors py-3 px-4">My Orders</a></li>
                <li><a className="hover:text-primary transition-colors py-3 px-4">Account Settings</a></li>
                <div className="divider my-0 opacity-20"></div>
                <li>
                    <button 
                        onClick={handleLogout} 
                        className="text-error font-bold hover:bg-error/10 transition-all py-3 px-4"
                    >
                        Sign Out
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default UserDropDown

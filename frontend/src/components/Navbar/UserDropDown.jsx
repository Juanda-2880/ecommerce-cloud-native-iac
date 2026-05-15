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
                className="btn btn-ghost btn-circle avatar"
            >
                <div className="w-10 rounded-full border-2 border-primary">
                    <img src={profileImage} alt="Avatar" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-3"
            >
                <li className="menu-title px-4 py-2 text-primary font-bold">
                    Hi, {user?.username || 'User'}
                </li>
                <div className="divider my-0"></div>
                <li>
                    <a className="justify-between">
                        Profile
                        <span className="badge"> New </span>
                    </a>
                </li>
                <li>
                    <a className="justify-between">Settings</a>
                </li>
                <li>
                    <button onClick={handleLogout} className="text-red-500 font-bold">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default UserDropDown

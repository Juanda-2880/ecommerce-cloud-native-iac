import profileImage from '../../assets/profile.png'

const UserDropDown = () => {
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
            >
                <div className="w-10 rounded-full">
                    <img src={profileImage} alt="Avatar" />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow"
            >
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
                    <a className="justify-between">Logout</a>
                </li>
            </ul>
        </div>
    )
}

export default UserDropDown

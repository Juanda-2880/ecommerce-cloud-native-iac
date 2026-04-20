import AuthButtons from './AuthButtons'
import Cart from './Cart'
import UserDropDown from './UserDropDown'
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <header>
            <AuthButtons />
            <nav className="navbar bs-base-100 shadow-sm lg:rounded-box w-full">
                <div className="navbar-start">
                    <Link className="btn btn-ghost normal-case text-xl" to="/">
                        Shoply
                    </Link>
                </div>
                <div className="navbar-end gap-3"></div>
                <a className="btn btn-primary">Dashboard</a>
                <Cart />
                <UserDropDown />
            </nav>
        </header>
    )
}

export default Navbar

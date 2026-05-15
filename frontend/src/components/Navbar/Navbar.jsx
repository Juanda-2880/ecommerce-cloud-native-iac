import AuthButtons from './AuthButtons'
import Cart from './Cart'
import UserDropDown from './UserDropDown'
import { Link } from 'react-router'
import { useEffect, useState } from 'react'

const Navbar = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    return (
        <header>
            {!user && <AuthButtons />}
            <nav className="navbar bg-base-100 shadow-sm lg:rounded-box w-full">
                <div className="navbar-start">
                    <Link className="btn btn-ghost normal-case text-xl" to="/">
                        Shoply
                    </Link>
                </div>
                <div className="navbar-end gap-3">
                    <Cart />
                    {user ? <UserDropDown user={user} /> : (
                        <div className="flex gap-2">
                            <Link to="/login" className="btn btn-primary btn-sm">Log In</Link>
                            <Link to="/register" className="btn btn-secondary btn-sm">Sign Up</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar

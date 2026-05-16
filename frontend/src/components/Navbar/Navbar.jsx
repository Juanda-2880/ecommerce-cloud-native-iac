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
        <header className="sticky top-0 z-50 backdrop-blur-md bg-base-100/70 border-b border-primary/20">
            <nav className="navbar container mx-auto px-4">
                <div className="navbar-start">
                    <Link className="text-3xl font-black text-primary tracking-tighter drop-shadow-[0_0_8px_rgba(0,243,255,0.6)] hover:drop-shadow-[0_0_12px_rgba(0,243,255,1)] transition-all duration-300" to="/">
                        SHOPLY
                    </Link>
                </div>
                <div className="navbar-end gap-2 lg:gap-4">
                    <Cart />
                    {user ? (
                        <UserDropDown user={user} />
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="btn btn-ghost btn-sm lg:btn-md hover:text-secondary transition-colors">Log In</Link>
                            <Link to="/signup" className="btn btn-primary btn-sm lg:btn-md shadow-[0_0_10px_rgba(0,243,255,0.4)]">Sign Up</Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar

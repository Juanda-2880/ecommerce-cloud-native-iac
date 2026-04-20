import Cart from './Cart'

const Navbar = () => {
    return (
        <header>
            <nav className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost normal-case text-xl">
                        E-commerce
                    </a>
                </div>
                <div className="navbar-end gap-3">
                    <Cart />
                </div>
            </nav>
        </header>
    )
}

export default Navbar

import { Link } from 'react-router'
import { FaShoppingCart } from 'react-icons/fa'

const Cart = () => {
    return (
        <Link to="/cart" className="btn btn-ghost btn-circle hover:bg-white/5 transition-colors">
            <div className="indicator">
                <FaShoppingCart className="h-5 w-5 text-primary" />
            </div>
        </Link>
    )
}

export default Cart

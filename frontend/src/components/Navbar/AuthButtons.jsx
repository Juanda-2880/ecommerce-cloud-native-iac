import { Link } from 'react-router'

const AuthButtons = () => {
    return (
        <div className="py-4 flex justify-center items-center gap-4 flex-wrap">
            <Link to="/register" className="btn btn-neutral btn-outline">
                Sign Up
            </Link>
            <div className="hidden lg:block"> | </div>
            <button className="btn btn-neutral btn-outline">Login</button>
        </div>
    )
}

export default AuthButtons

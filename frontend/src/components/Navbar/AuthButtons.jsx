import { Link } from 'react-router'

const AuthButtons = () => {
    return (
        <div className="py-6 flex justify-center items-center gap-6 animate-fade-in bg-gradient-to-r from-transparent via-neutral/50 to-transparent">
            <Link to="/signup" className="btn btn-outline btn-primary px-8 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all">
                Join the Neon Revolution
            </Link>
            <div className="text-primary/30 hidden lg:block"> • </div>
            <Link to="/login" className="btn btn-link text-secondary font-bold no-underline hover:text-secondary-focus transition-colors">
                Existing Member Login
            </Link>
        </div>
    )
}

export default AuthButtons

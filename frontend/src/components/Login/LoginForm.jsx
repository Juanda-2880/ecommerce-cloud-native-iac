import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import { LoginService } from '../../services/authService'

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setLoading(true)
        setMessage({ type: '', text: '' })
        try {
            await LoginService(data)
            setMessage({ type: 'success', text: 'Welcome back! Redirecting...' })
            setTimeout(() => {
                navigate('/')
                window.location.reload()
            }, 1500)
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Invalid credentials.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto form-entrance p-8 bg-neutral/40 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-2xl"
        >
            <h2 className="text-3xl font-bold text-center text-secondary mb-2 drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
                Welcome Back
            </h2>
            {message.text && (
                <div className={`p-3 rounded-lg text-sm text-center font-bold transition-all duration-300 ${message.type === 'success' ? 'bg-success/20 text-success border border-success/50' : 'bg-error/20 text-error border border-error/50'}`}>
                    {message.text}
                </div>
            )}
            <div>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email' }
                    })}
                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                    placeholder="Email"
                    type="email"
                />
                {errors.email && <p className="text-error text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>
            <div>
                <div className="relative">
                    <input
                        {...register('password', { required: 'Password is required' })}
                        className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && <p className="text-error text-xs mt-1 ml-1">{errors.password.message}</p>}
            </div>
            <button
                type="submit"
                disabled={loading}
                className="btn btn-secondary w-full font-bold shadow-[0_0_15px_rgba(255,0,255,0.3)] hover:shadow-[0_0_25px_rgba(255,0,255,0.5)]"
            >
                {loading ? <span className="loading loading-spinner"></span> : 'Secure Log In'}
            </button>
            <p className="text-center text-sm text-gray-400">
                New here?{' '}
                <Link to="/signup" className="text-primary font-bold hover:underline hover:text-primary-focus transition-colors">
                    Join Shoply
                </Link>
            </p>
        </form>
    )
}

export default LoginForm

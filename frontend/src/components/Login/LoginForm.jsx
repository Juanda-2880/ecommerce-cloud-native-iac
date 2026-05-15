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
            setMessage({ type: 'success', text: 'Login successful! Redirecting...' })
            setTimeout(() => {
                navigate('/')
                window.location.reload()
            }, 1500)
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Invalid email or password.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto"
        >
            {message.text && (
                <div className={`p-3 rounded text-sm ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                </div>
            )}
            <div>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.email ? 'border-red-500 focus:outline-red-500' : ''
                    }`}
                    autoComplete="email"
                    placeholder="Email"
                    type="email"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div>
                <div className="relative">
                    <input
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        className={`p-2 pr-10 outline-2 rounded border focus:outline-primary w-full ${
                            errors.password
                                ? 'border-red-500 focus:outline-red-500'
                                : ''
                        }`}
                        autoComplete="current-password"
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer flex items-center justify-center"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-primary text-white p-2 rounded font-bold hover:bg-primary/90 transition-colors cursor-pointer disabled:bg-gray-400"
            >
                {loading ? 'Logging In...' : 'Log In'}
            </button>
            <p className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link to="/register" className="text-primary font-bold hover:underline">
                    Sign Up
                </Link>
            </p>
        </form>
    )
}

export default LoginForm

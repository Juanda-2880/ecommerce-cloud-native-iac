import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import { SignupService } from '../../services/authService'

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const navigate = useNavigate()

    const password = watch('password', '')

    const passwordRequirements = [
        { label: 'At least 2 numbers', test: (val) => (val.match(/[0-9]/g) || []).length >= 2 },
        { label: 'One special character', test: (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val) },
        { label: 'One uppercase letter', test: (val) => /[A-Z]/.test(val) },
        { label: 'Minimum 8 characters', test: (val) => val.length >= 8 },
    ]

    const onSubmit = async (data) => {
        setLoading(true)
        setMessage({ type: '', text: '' })
        try {
            await SignupService(data)
            setMessage({ type: 'success', text: 'Account created! Redirecting to home...' })
            setTimeout(() => {
                navigate('/')
                window.location.reload()
            }, 1500)
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Something went wrong.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto form-entrance p-8 bg-neutral/40 rounded-2xl border border-primary/20 backdrop-blur-sm shadow-2xl"
        >
            <h2 className="text-3xl font-bold text-center text-primary mb-2 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
                Create Account
            </h2>
            {message.text && (
                <div className={`p-3 rounded-lg text-sm text-center font-bold transition-all duration-300 ${message.type === 'success' ? 'bg-success/20 text-success border border-success/50' : 'bg-error/20 text-error border border-error/50'}`}>
                    {message.text}
                </div>
            )}
            <div>
                <input
                    {...register('username', {
                        required: 'Username is required',
                        minLength: { value: 3, message: 'Too short' },
                    })}
                    className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
                    placeholder="Username"
                    type="text"
                />
                {errors.username && <p className="text-error text-xs mt-1 ml-1">{errors.username.message}</p>}
            </div>
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
                        {...register('password', { 
                            required: 'Password is required',
                            validate: {
                                twoNumbers: (v) => (v.match(/[0-9]/g) || []).length >= 2 || 'Requires at least 2 numbers',
                                specialChar: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Requires one special character',
                                uppercase: (v) => /[A-Z]/.test(v) || 'Requires one uppercase letter',
                                minLength: (v) => v.length >= 8 || 'Minimum 8 characters'
                            }
                        })}
                        className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:text-secondary transition-colors"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                
                {/* Visual Feedback for Requirements */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-base-100/50 rounded-lg border border-primary/10">
                    {passwordRequirements.map((req, i) => {
                        const isMet = req.test(password)
                        return (
                            <div key={i} className={`flex items-center gap-2 text-[10px] transition-colors duration-300 ${isMet ? 'text-success' : 'text-gray-500'}`}>
                                {isMet ? <FaCheckCircle /> : <FaTimesCircle className="opacity-50" />}
                                {req.label}
                            </div>
                        )
                    })}
                </div>

                {errors.password && <p className="text-error text-xs mt-2 ml-1 font-bold animate-pulse">{errors.password.message}</p>}
            </div>
            <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full font-bold shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] mt-2"
            >
                {loading ? <span className="loading loading-spinner"></span> : 'Secure Sign Up'}
            </button>
            <p className="text-center text-sm text-gray-400">
                Already member?{' '}
                <Link to="/login" className="text-secondary font-bold hover:underline hover:text-secondary-focus transition-colors">
                    Log In
                </Link>
            </p>
        </form>
    )
}

export default SignupForm

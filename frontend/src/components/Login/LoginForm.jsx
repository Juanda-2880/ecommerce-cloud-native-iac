import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa'
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
            setMessage({ type: 'success', text: 'Identity verified. Access granted.' })
            setTimeout(() => {
                navigate('/')
                window.location.reload()
            }, 1500)
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Verification failed. Access denied.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-6 max-w-[500px] mx-auto form-entrance p-8 bg-neutral/40 rounded-3xl border border-secondary/20 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-3xl -ml-16 -mt-16 animate-pulse"></div>

            <div className="flex justify-center mb-2">
                <div className="p-4 bg-secondary/10 rounded-full border border-secondary/20 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                    <FaShieldAlt className="text-3xl text-secondary animate-pulse" />
                </div>
            </div>

            <h2 className="text-3xl font-black text-center text-secondary tracking-tighter mb-2 drop-shadow-[0_0_12px_rgba(255,0,255,0.4)] uppercase">
                Secure Access
            </h2>

            {message.text && (
                <div className={`p-3 rounded-xl text-xs text-center font-bold tracking-tight transition-all duration-300 ${message.type === 'success' ? 'bg-success/20 text-success border border-success/40' : 'bg-error/20 text-error border border-error/40'}`}>
                    {message.text}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid identity format' }
                        })}
                        className={`input input-bordered w-full rounded-xl tracking-tight ${errors.email ? 'input-error' : ''}`}
                        placeholder="Email Address"
                        type="email"
                    />
                    {errors.email && <p className="text-error text-[10px] mt-1 ml-1 font-bold uppercase tracking-wider">{errors.email.message}</p>}
                </div>

                <div>
                    <div className="relative">
                        <input
                            {...register('password', { required: 'Security key required' })}
                            className={`input input-bordered w-full pr-10 rounded-xl tracking-tight ${errors.password ? 'input-error' : ''}`}
                            placeholder="Security Key"
                            type={showPassword ? 'text' : 'password'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-secondary transition-colors"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && <p className="text-error text-[10px] mt-1 ml-1 font-bold uppercase tracking-wider">{errors.password.message}</p>}
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="btn btn-secondary w-full font-black text-sm uppercase tracking-[0.2em] rounded-xl h-14 shadow-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
            >
                {loading ? <span className="loading loading-spinner"></span> : 'Authenticate'}
            </button>

            <p className="text-center text-[10px] text-gray-500 uppercase tracking-[0.15em]">
                Unregistered?{' '}
                <Link to="/signup" className="text-primary font-bold hover:text-secondary transition-colors underline decoration-primary/30">
                    Initialize Signup
                </Link>
            </p>
        </form>
    )
}

export default LoginForm

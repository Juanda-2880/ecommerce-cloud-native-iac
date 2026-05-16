import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle, FaUserTag, FaStore } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import { SignupService } from '../../services/authService'

const SignupForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            role: 'buyer'
        }
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const navigate = useNavigate()

    const password = watch('password', '')
    const selectedRole = watch('role')

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
            setMessage({ type: 'success', text: 'Welcome to Shoply! Redirecting...' })
            setTimeout(() => {
                navigate('/')
                window.location.reload()
            }, 1500)
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Signup failed.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-5 max-w-[500px] mx-auto form-entrance p-8 bg-neutral/40 rounded-3xl border border-primary/20 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
            
            <h2 className="text-3xl font-black text-center text-primary tracking-tight mb-2 drop-shadow-[0_0_12px_rgba(0,243,255,0.4)]">
                JOIN SHOPLY
            </h2>

            {message.text && (
                <div className={`p-3 rounded-xl text-xs text-center font-bold transition-all duration-300 ${message.type === 'success' ? 'bg-success/20 text-success border border-success/40' : 'bg-error/20 text-error border border-error/40'}`}>
                    {message.text}
                </div>
            )}

            {/* Role Selector */}
            <div className="flex gap-4 p-1 bg-base-100/50 rounded-2xl border border-primary/10">
                <button
                    type="button"
                    onClick={() => setValue('role', 'buyer')}
                    className={`flex-1 py-3 px-4 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${selectedRole === 'buyer' ? 'bg-primary text-neutral font-bold shadow-lg shadow-primary/20 scale-[1.02]' : 'hover:bg-primary/5 text-gray-500'}`}
                >
                    <FaUserTag className="text-lg" />
                    <span className="text-[10px] uppercase tracking-widest">Buyer</span>
                </button>
                <button
                    type="button"
                    onClick={() => setValue('role', 'salesperson')}
                    className={`flex-1 py-3 px-4 rounded-xl flex flex-col items-center gap-1 transition-all duration-300 ${selectedRole === 'salesperson' ? 'bg-secondary text-neutral font-bold shadow-lg shadow-secondary/20 scale-[1.02]' : 'hover:bg-secondary/5 text-gray-500'}`}
                >
                    <FaStore className="text-lg" />
                    <span className="text-[10px] uppercase tracking-widest">Seller</span>
                </button>
            </div>
            <input type="hidden" {...register('role')} />

            <div className="space-y-4 mt-2">
                <div>
                    <input
                        {...register('username', { required: 'Username is required', minLength: 3 })}
                        className={`input input-bordered w-full rounded-xl ${errors.username ? 'input-error' : ''}`}
                        placeholder="Choose Username"
                        type="text"
                    />
                </div>

                <div>
                    <input
                        {...register('email', { 
                            required: 'Email is required',
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}
                        className={`input input-bordered w-full rounded-xl ${errors.email ? 'input-error' : ''}`}
                        placeholder="Email Address"
                        type="email"
                    />
                </div>

                <div>
                    <div className="relative">
                        <input
                            {...register('password', { 
                                required: true,
                                validate: (v) => passwordRequirements.every(r => r.test(v)) || 'Requirements not met'
                            })}
                            className={`input input-bordered w-full pr-10 rounded-xl ${errors.password ? 'input-error' : ''}`}
                            placeholder="Create Password"
                            type={showPassword ? 'text' : 'password'}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 p-4 bg-neutral/60 rounded-xl border border-primary/5">
                        {passwordRequirements.map((req, i) => {
                            const isMet = req.test(password)
                            return (
                                <div key={i} className={`flex items-center gap-2 text-[9px] font-medium tracking-tight transition-all duration-300 ${isMet ? 'text-success drop-shadow-[0_0_2px_rgba(0,255,133,0.3)]' : 'text-gray-600'}`}>
                                    {isMet ? <FaCheckCircle /> : <FaTimesCircle className="opacity-30" />}
                                    {req.label}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`btn ${selectedRole === 'salesperson' ? 'btn-secondary' : 'btn-primary'} w-full font-black text-sm uppercase tracking-[0.2em] rounded-xl h-14 shadow-2xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] mt-2`}
            >
                {loading ? <span className="loading loading-spinner"></span> : `JOIN AS ${selectedRole}`}
            </button>

            <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mt-2">
                Already member?{' '}
                <Link to="/login" className="text-primary font-bold hover:text-secondary transition-colors">
                    LOG IN
                </Link>
            </p>
        </form>
    )
}

export default SignupForm

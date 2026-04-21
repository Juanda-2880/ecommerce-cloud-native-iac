import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router'

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange', //Real Time Validation
    })
    const [showPassword, setShowPassword] = useState(false)
    const onSubmit = (data) => {
        reset()
        //Register user
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto"
        >
            <div>
                <input
                    {...register('username', {
                        required: 'Username is required',
                        minLength: {
                            value: 3,
                            message: 'Username must be at least 3 characters',
                        },
                        maxLength: {
                            value: 20,
                            message: 'Username must be less than 20 characters',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.username
                            ? 'border-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    autoComplete="username"
                    placeholder="Username"
                    type="text"
                />
                {errors.username && (
                    <p className="text-red-500 text-sm mt-2 ml-1">
                        {errors.username.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Invalid email address',
                        },
                        minLength: {
                            value: 5,
                            message: 'Email must be at least 5 characters',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Email must be less than 50 characters',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.email
                            ? 'border-red-500 focus:outline-red-500'
                            : ''
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
                            minLength: {
                                value: 6,
                                message:
                                    'Password must be at least 6 characters',
                            },
                            maxLength: {
                                value: 99,
                                message:
                                    'Password must be less than 100 characters',
                            },
                        })}
                        className={`p-2 pr-10 outline-2 rounded border focus:outline-primary w-full ${
                            errors.password
                                ? 'border-red-500 focus:outline-red-500'
                                : ''
                        }`}
                        autoComplete="new-password"
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
                className="mt-2 bg-primary text-white p-2 rounded font-bold hover:bg-primary/90 transition-colors cursor-pointer"
            >
                Sign Up
            </button>
            <p className="text-center text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline">
                    Log In
                </Link>
            </p>
        </form>
    )
}

export default RegisterForm

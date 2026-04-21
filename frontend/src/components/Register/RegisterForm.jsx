import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onChange', //Real Time Validation
    })
    const onSubmit = (data) => {
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
                    className="p-2 outline-2 rounded border focus:outline-primary w-full"
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
        </form>
    )
}

export default RegisterForm

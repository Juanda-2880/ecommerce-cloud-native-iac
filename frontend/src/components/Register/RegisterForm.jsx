import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { error },
        reset,
    } = useForm({
        mode: 'onchange', //Real Time Validation
    })
    const onSubmit = (data) => {
        //Register user
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] max-auto"
        >
            <div>
                <input
                    autoComplete="usernames"
                    name="username"
                    placeholder="Username"
                    type="text"
                />
            </div>
        </form>
    )
}

export default RegisterForm

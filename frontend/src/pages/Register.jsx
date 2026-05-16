import RegisterForm from '../components/Register/RegisterForm'

const SignupPage = () => {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 page-transition">
            <div className="w-full max-w-[500px]">
                <RegisterForm />
            </div>
        </div>
    )
}

export default SignupPage

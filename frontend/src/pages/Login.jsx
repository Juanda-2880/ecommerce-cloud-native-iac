import LoginForm from '../components/Login/LoginForm'

const LoginPage = () => {
    return (
        <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 page-transition">
            <div className="w-full max-w-[500px]">
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage

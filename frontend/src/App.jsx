import { Route, Routes } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Register'

function App() {
    return (
        <div data-theme="neon" className="min-h-screen">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App

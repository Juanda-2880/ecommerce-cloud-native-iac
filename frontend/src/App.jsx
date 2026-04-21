import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Route>
        </Routes>
    )
}

export default App

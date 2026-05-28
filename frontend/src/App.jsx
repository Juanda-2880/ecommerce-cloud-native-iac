import { Route, Routes } from 'react-router'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Register'
import SellerDashboard from './pages/SellerDashboard'
import AccountSettings from './pages/AccountSettings'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'

function App() {
    return (
        <div data-theme="neon" className="min-h-screen">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="seller-dashboard" element={<SellerDashboard />} />
                    <Route path="account-settings" element={<AccountSettings />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="basket" element={<CartPage />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import AuthProvider from "./contexts/auth/AuthProvider"
import LoginPage from "./pages/LoginPage"
import CartPage from "./pages/CartPage"
import ProtectedRoute from "./components/ProtectedRoute"
import CartProvider from "./contexts/cart/CartProvider"
import NotFound from "./pages/NotFound"
import CheckoutPage from "./pages/CheckoutPage"
import OrderSuccessPage from "./pages/OrderSuccessPage"


function App() {

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<CartPage />}/>
              <Route path="/checkout" element={<CheckoutPage />}/>
              <Route path="/order-success" element={<OrderSuccessPage />}/>
            </Route>
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App

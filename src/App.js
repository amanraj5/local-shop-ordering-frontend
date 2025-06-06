import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './component/SignIn';
import Login from './component/Login';
import Home from './component/Home';
import Cart from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import About from './pages/About';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import OrderSummary from './pages/OrderSummary';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminPage from './pages/AdminPage';
import AddShopPage from './pages/AddShopPage';
import DeleteShopPage from './pages/DeleteShopPage';
import DeleteProduct from './pages/DeleteProduct';
import AddProduct from './pages/AddProduct';

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path='/products/:shopId' element={<ProductsPage />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/about' element={<About />} />
            <Route path='/checkout' element={<CheckoutPage />} />
            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path='/myorders' element={<MyOrdersPage />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/addshop' element={<AddShopPage />} />
            <Route path='/deleteshop' element={<DeleteShopPage/>} />
            <Route path='/deleteproduct' element={<DeleteProduct />} />
            <Route path='/addproduct' element={<AddProduct />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </CartProvider>
  );
}

export default App;

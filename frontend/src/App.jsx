
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import CustomerList from './pages/CustomerList';
import PaintingList from './pages/PaintingList';
import OrderList from './pages/OrderList';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import AccountPage from './pages/AccountPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="customers" element={<CustomerList />} />
          <Route path="paintings" element={<PaintingList />} />
          <Route path="orders" element={<OrderList />} />
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/paintings" element={<ProductPage />} />
        <Route path="/search" element={<ProductPage />} /> {/* Placeholder */}
        <Route path="/painting/:id" element={<ProductPage />} /> {/* Placeholder */}
        <Route path="/cart" element={<ProductPage />} /> {/* Placeholder */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/chatbot" element={<ProductPage />} /> {/* Placeholder */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/profile" element={<AccountPage />} /> {/* Default to profile */}
        <Route path="/account/orders" element={<AccountPage />} /> {/* Placeholder */}
        <Route path="/account/purchase-history" element={<AccountPage />} /> {/* Placeholder */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
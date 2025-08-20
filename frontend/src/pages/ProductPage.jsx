
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function ProductPage() {
  const [paintings, setPaintings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        console.log('Fetching paintings from /api/paintings');
        const response = await axios.get('http://localhost:8080/api/paintings');
        console.log('Paintings response:', response.data);
        setPaintings(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        console.error('Fetch paintings error:', err.response?.status, err.response?.data);
        setError('Lỗi lấy danh sách tranh: ' + (err.response?.data || err.message));
        toast.error('Lỗi lấy danh sách tranh');
        setLoading(false);
      }
    };
    fetchPaintings();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Đăng xuất thành công!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-200 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-5 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="logo text-2xl font-bold">🖼️ ArtGallery</div>
        <nav className="nav-center flex gap-4 flex-wrap justify-center flex-1">
          <Link to="/home" className="hover:text-yellow-300">Trang chủ</Link>
          <Link to="/paintings" className="hover:text-yellow-300">Sản phẩm</Link>
          <Link to="/about" className="hover:text-yellow-300">Giới thiệu</Link>
          <Link to="/contact" className="hover:text-yellow-300">Liên hệ</Link>
          <Link to="/chatbot" className="hover:text-yellow-300">Hỗ trợ</Link>
          <Link to="/account" className="hover:text-yellow-300">Tài khoản</Link>
        </nav>
        <div className="nav-right flex items-center gap-4">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm tranh..."
              className="p-2 rounded border-none"
              onKeyPress={(e) => e.key === 'Enter' && navigate(`/search?keyword=${e.target.value}`)}
            />
          </div>
          <Link to="/cart" className="icon-link hover:text-yellow-300">
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <button onClick={handleLogout} className="hover:text-yellow-300">
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto p-6 lg:p-12 flex-1">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Danh sách tranh</h2>
        {loading && <div className="text-center text-gray-600 text-lg">Đang tải...</div>}
        {error && <div className="text-center text-red-500 text-lg mb-4">{error}</div>}
        {!loading && !error && paintings.length === 0 && (
          <div className="text-center text-gray-600 p-8">Không có tranh nào để hiển thị.</div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {paintings.map((painting) => (
              <div
                key={painting.id}
                className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105 duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={`https://via.placeholder.com/400x300/e6e6e6?text=${encodeURIComponent(painting.title)}`}
    alt={painting.title}
className="w-full h-full object-cover"
    />
    </div>
<div className="p-6">
    <h3 className="text-xl font-bold text-gray-800 truncate">{painting.title}</h3>
    <p className="text-sm text-gray-500 mt-1">Họa sĩ: {painting.artist || 'Không rõ'}</p>
    <p className="text-2xl font-extrabold text-indigo-600 mt-3">
        {painting.price.toLocaleString('vi-VN')} VND
    </p>
    <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
            <label htmlFor={`quantity-${painting.id}`} className="text-gray-700">Số lượng:</label>
            <input
                type="number"
                id={`quantity-${painting.id}`}
                name="quantity"
                defaultValue="1"
                min="1"
                max="99"
                className="w-16 text-center border rounded-md py-1 px-2"
            />
        </div>
        <Link
            to="/cart"
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md transition-colors hover:bg-indigo-700 flex items-center"
        >
            <i className="fas fa-shopping-cart mr-2"></i>Đặt hàng
        </Link>
    </div>
</div>
</div>
))}
</div>
)}
</main>

{/* Footer */}
<footer className="bg-gray-800 text-white p-4 text-center">
    <p>&copy; 2025 Cửa hàng tranh nghệ thuật. Bản quyền thuộc về bạn.</p>
</footer>
</div>
);
}

export default ProductPage;

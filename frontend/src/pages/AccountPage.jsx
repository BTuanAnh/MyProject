import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function AccountPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    phone: '',
    email: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Không tìm thấy token');
        const response = await axios.get('http://localhost:8080/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setError(null);
      } catch (err) {
        console.error('Fetch user profile error:', err.response?.data || err.message);
        setError('Lỗi lấy thông tin cá nhân: ' + (err.response?.data?.message || err.message));
        toast.error('Lỗi lấy thông tin cá nhân');
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Không tìm thấy token');
      await axios.put('http://localhost:8080/api/users/update', user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Cập nhật hồ sơ thành công!');
    } catch (err) {
      console.error('Update profile error:', err.response?.data || err.message);
      setError('Lỗi cập nhật hồ sơ: ' + (err.response?.data?.message || err.message));
      toast.error('Lỗi cập nhật hồ sơ');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Đăng xuất thành công!');
    navigate('/login');
  };

  return (
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 text-white p-5 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="logo text-2xl font-bold">🖼️ ArtGallery</div>
          <nav className="nav-center flex gap-4 flex-wrap justify-center flex-1">
            <Link to="/home" className="hover:text-yellow-300">Trang chủ</Link>
            <Link to="/paintings" className="hover:text-yellow-300">Sản phẩm</Link>
            <Link to="/about" className="hover:text-yellow-300">Giới thiệu</Link>
            <Link to="/contact" className="hover:text-yellow-300">Liên hệ</Link>
            <Link to="/chatbot" className="hover:text-yellow-300">Hỗ trợ</Link>
            <Link to="/account" className="hover:text-yellow-300 underline">Tài khoản</Link>
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
        <main className="bg-gray-100 flex-1 py-12 md:py-20">
          <div className="flex justify-center">
            <div className="w-full max-w-6xl px-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="md:w-64 flex-shrink-0 bg-gray-900 rounded-xl p-4 md:p-6 shadow-lg">
                  <nav className="space-y-4">
                    <Link to="/account/profile" className="block bg-green-600 text-white font-semibold py-3 px-4 rounded-lg text-center transition-colors hover:bg-green-700">
                      Thông tin cá nhân
                    </Link>
                    <Link to="/account/orders" className="block bg-gray-800 text-gray-300 font-semibold py-3 px-4 rounded-lg text-center transition-colors hover:bg-gray-700 hover:text-white">
                      Theo dõi đơn hàng
                    </Link>
                    <Link to="/account/purchase-history" className="block bg-gray-800 text-gray-300 font-semibold py-3 px-4 rounded-lg text-center transition-colors hover:bg-gray-700 hover:text-white">
                      Lịch sử mua hàng
                    </Link>
                  </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white rounded-xl shadow-lg p-8 md:p-12">
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-8">Thông tin cá nhân</h2>

                  {loading && <div className="text-center text-gray-600 text-lg">Đang tải...</div>}
                  {error && <div className="text-center text-red-500 text-lg mb-4">{error}</div>}
                  {!loading && !error && (
                      <form onSubmit={handleSubmit}>
                        {/* User Name */}
                        <div className="mb-6">
                          <label htmlFor="username" className="block text-lg font-medium text-gray-700 mb-2">Tên người dùng</label>
                          <input
                              type="text"
                              id="username"
                              name="username"
                              value={user.username}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Phone Number */}
                        <div className="mb-6">
                          <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">Số điện thoại</label>
                          <input
                              type="text"
                              id="phone"
                              name="phone"
                              value={user.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Email */}
                        <div className="mb-6">
                          <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                          <input
                              type="email"
                              id="email"
                              name="email"
                              value={user.email}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Address */}
                        <div className="mb-8">
                          <label htmlFor="address" className="block text-lg font-medium text-gray-700 mb-2">Địa chỉ</label>
                          <input
                              type="text"
                              id="address"
                              name="address"
                              value={user.address}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* Update Button */}
                        <div className="text-center">
                          <button
                              type="submit"
                              className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors hover:bg-blue-700"
                          >
                            Cập nhật hồ sơ
                          </button>
                        </div>
                      </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2025 Cửa hàng tranh nghệ thuật. Bản quyền thuộc về bạn.</p>
        </footer>
      </div>
  );
}

export default AccountPage;

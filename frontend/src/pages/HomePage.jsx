import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const [paintings, setPaintings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/paintings');
        setPaintings(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
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

  const featuredPainting = paintings[0] || null;

  return (
      <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 text-white px-6 py-4 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="logo text-2xl font-bold">🖼️ ArtGallery</div>

          <nav className="flex gap-4 flex-wrap justify-center flex-1">
            <Link to="/home" className="hover:text-yellow-300">Trang chủ</Link>
            <Link to="/paintings" className="hover:text-yellow-300">Sản phẩm</Link>
            <Link to="/about" className="hover:text-yellow-300">Giới thiệu</Link>
            <Link to="/contact" className="hover:text-yellow-300">Liên hệ</Link>
            <Link to="/chatbot" className="hover:text-yellow-300">Hỗ trợ</Link>
            <Link to="/account" className="hover:text-yellow-300">Tài khoản</Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="search-box">
              <input
                  type="text"
                  placeholder="Tìm tranh..."
                  className="p-2 rounded border-none"
                  onKeyPress={(e) => e.key === 'Enter' && navigate(`/search?keyword=${e.target.value}`)}
              />
            </div>
            <Link to="/cart" className="hover:text-yellow-300">
              <i className="fas fa-shopping-cart"></i>
            </Link>
            <button onClick={handleLogout} className="hover:text-yellow-300">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 py-12 md:py-20">
          <div className="container mx-auto px-4 lg:px-8 max-w-[1440px]">

            {/* Hero */}
            <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 md:p-8 text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Chào mừng bạn đến với ArtGallery!</h2>
              <p className="text-lg md:text-xl mb-6">Khám phá thế giới nghệ thuật đầy cảm hứng của chúng tôi.</p>
              <Link
                  to="/paintings"
                  className="bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
              >
                Khám phá tranh
              </Link>
            </div>

            {/* Tranh Bán Chạy */}
            <section className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">Tranh Bán Chạy</h2>
              {loading && <div className="text-center text-gray-600 text-lg">Đang tải...</div>}
              {error && <div className="text-center text-red-500 text-lg mb-4">{error}</div>}
              {!loading && !error && paintings.length === 0 && (
                  <div className="text-center text-gray-600 p-8">Không có tranh bán chạy nào.</div>
              )}
              {!loading && !error && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {paintings.map((painting) => (
                        <Link key={painting.id} to={`/painting/${painting.id}`} className="transform hover:-translate-y-2 transition-transform">
                          <div className="h-60 md:h-72 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
                            <span className="text-gray-500">Hình ảnh tranh</span>
                          </div>
                          <div className="p-3">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-center">{painting.title}</h3>
                            <p className="text-green-600 font-bold text-center mb-2">
                              {painting.price.toLocaleString('vi-VN')} đ
                            </p>
                          </div>
                        </Link>
                    ))}
                  </div>
              )}
            </section>

            {/* Tác phẩm nổi bật */}
            <section className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">Tác phẩm nổi bật</h2>
              {!loading && !error && paintings.length === 0 && (
                  <div className="text-center text-gray-600 p-8">Không có tác phẩm nổi bật.</div>
              )}
              {!loading && !error && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {paintings.map((painting) => (
                        <Link key={painting.id} to={`/painting/${painting.id}`} className="transform hover:-translate-y-2 transition-transform">
                          <div className="h-60 md:h-72 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
                            <span className="text-gray-500">Hình ảnh tranh</span>
                          </div>
                          <div className="p-3">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-center">{painting.title}</h3>
                            <p className="text-green-600 font-bold text-center mb-2">
                              {painting.price.toLocaleString('vi-VN')} đ
                            </p>
                          </div>
                        </Link>
                    ))}
                  </div>
              )}
            </section>

            {/* Tác phẩm của năm */}
            <section className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">Tác phẩm của năm ✨</h2>
              {!loading && !error && featuredPainting && (
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="md:w-2/3">
                      <Link to={`/painting/${featuredPainting.id}`}>
                        <div className="h-72 md:h-96 bg-gray-300 flex items-center justify-center rounded-lg shadow-xl">
                          <span className="text-gray-500">Hình ảnh tác phẩm</span>
                        </div>
                      </Link>
                    </div>
                    <div className="md:w-1/3 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{featuredPainting.title}</h3>
                      <p className="text-gray-700 mb-4">
                        Một kiệt tác đã chinh phục trái tim của giới mộ điệu. Tác phẩm này là sự kết hợp hoàn hảo giữa kỹ thuật và cảm xúc.
                      </p>
                      <Link
                          to={`/painting/${featuredPainting.id}`}
                          className="inline-block bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
                      >
                        Xem chi tiết &rarr;
                      </Link>
                    </div>
                  </div>
              )}
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2025 Cửa hàng tranh nghệ thuật. Bản quyền thuộc về bạn.</p>
        </footer>
      </div>
  );
}

export default HomePage;

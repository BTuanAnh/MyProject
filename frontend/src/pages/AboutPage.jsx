
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AboutPage() {
  const navigate = useNavigate();

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
          <Link to="/about" className="hover:text-yellow-300 underline">Giới thiệu</Link>
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
      <main className="bg-gray-100 flex-1 py-12 md:py-20">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
              Câu chuyện đằng sau mỗi tác phẩm
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi không chỉ bán tranh, chúng tôi mang đến những câu chuyện, những cảm xúc và những giá trị nghệ thuật đích thực.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://placehold.co/800x600/2c3e50/ffffff?text=Our+Mission"
                className="w-full rounded-lg shadow-md"
                alt="Hình ảnh về sứ mệnh của chúng tôi"
                onError={(e) => (e.target.src = 'https://placehold.co/800x600/2c3e50/ffffff?text=Image+Not+Found')}
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Sứ mệnh của chúng tôi</h3>
              <p className="text-lg text-gray-600 mb-4">
                ArtGallery được thành lập với sứ mệnh kết nối những người yêu nghệ thuật với các tác phẩm độc đáo của các họa sĩ tài năng tại Việt Nam. Chúng tôi tin rằng nghệ thuật có sức mạnh làm đẹp cuộc sống và truyền cảm hứng.
              </p>
              <p className="text-lg text-gray-600">
                Chúng tôi cam kết mang đến những sản phẩm chất lượng cao, từ những bức tranh sơn dầu, sơn mài đến các tác phẩm điêu khắc, tất cả đều được tuyển chọn kỹ lưỡng và đảm bảo về giá trị nghệ thuật.
              </p>
            </div>
          </div>

          {/* Artists/Story Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://placehold.co/800x600/f39c12/ffffff?text=Our+Story"
                className="w-full rounded-lg shadow-md"
                alt="Hình ảnh về câu chuyện của chúng tôi"
                onError={(e) => (e.target.src = 'https://placehold.co/800x600/f39c12/ffffff?text=Image+Not+Found')}
              />
            </div>
            <div className="md:w-1/2 md:pr-8">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Từ niềm đam mê...</h3>
              <p className="text-lg text-gray-600 mb-4">
                ArtGallery bắt đầu từ niềm đam mê sâu sắc với nghệ thuật và mong muốn tạo ra một không gian nơi mọi người có thể dễ dàng tiếp cận và sở hữu các tác phẩm nghệ thuật. Chúng tôi đã đi khắp mọi miền đất nước để tìm kiếm và hợp tác với những nghệ sĩ có cùng chí hướng.
              </p>
              <p className="text-lg text-gray-600">
                Mỗi tác phẩm tại ArtGallery đều mang một câu chuyện riêng, một phần tâm hồn của người nghệ sĩ. Chúng tôi tự hào là cầu nối giúp những câu chuyện đó được lan tỏa.
              </p>
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

export default AboutPage;
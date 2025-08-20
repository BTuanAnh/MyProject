import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ContactPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Đăng xuất thành công!');
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thông tin đã được gửi thành công!');
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
          <Link to="/contact" className="hover:text-yellow-300 underline">Liên hệ</Link>
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
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Liên hệ với chúng tôi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Contact Information Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Thông tin liên hệ</h3>

              {/* Address */}
              <div className="bg-gray-200 rounded-lg p-4 mb-4">
                <h4 className="text-xl font-semibold text-gray-800">Địa chỉ</h4>
                <p className="text-gray-600 mt-2">123 Đường Sách Quận 1, TP. HCM</p>
              </div>

              {/* Phone */}
              <div className="bg-gray-200 rounded-lg p-4 mb-4">
                <h4 className="text-xl font-semibold text-gray-800">Điện thoại</h4>
                <p className="text-gray-600 mt-2">028 1234 5678</p>
                <p className="text-gray-600">Hotline: 0901.234.567</p>
              </div>

              {/* Email */}
              <div className="bg-gray-200 rounded-lg p-4 mb-4">
                <h4 className="text-xl font-semibold text-gray-800">Email</h4>
                <p className="text-gray-600 mt-2">info@artgallery.com</p>
                <p className="text-gray-600">support@artgallery.com</p>
              </div>

              {/* Working Hours */}
              <div className="bg-gray-200 rounded-lg p-4">
                <h4 className="text-xl font-semibold text-gray-800">Giờ làm việc</h4>
                <div className="mt-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Thứ Hai - Thứ Sáu</span>
                    <span>8:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thứ Bảy</span>
                    <span>9:00 - 21:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chủ Nhật</span>
                    <span>9:00 - 20:00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Gửi thông tin liên hệ</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className="block text-lg font-medium text-gray-700 mb-2">Chủ đề</label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">--Chọn chủ đề--</option>
                    <option value="Hoi_ve_san_pham">Hỏi về sản phẩm</option>
                    <option value="Dat_hang_va_van_chuyen">Đặt hàng và vận chuyển</option>
                    <option value="Hop_tac_nghe_si">Hợp tác nghệ sĩ</option>
                    <option value="Khac">Khác</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Nội dung</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors hover:bg-blue-700"
                  >
                    Gửi thông tin
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Bản đồ</h3>
            <div className="relative overflow-hidden rounded-lg shadow-md" style={{ height: '400px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3195250493866!2d106.67104381524823!3d10.786016161947248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40b2f15e8b%3A0x6a0a0d4c82c6114e!2zMTIzIMSQxrnh5dngIFPDsWNoIFF14bqnbiwgUGjGsOG7nW5nIDEwLCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1628172049079!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
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

export default ContactPage;
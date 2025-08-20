import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Đăng xuất thành công!');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/customers" className="block p-2 hover:bg-gray-700 rounded">
                Quản lý khách hàng
              </Link>
            </li>
            <li>
              <Link to="/admin/paintings" className="block p-2 hover:bg-gray-700 rounded">
                Quản lý tranh
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className="block p-2 hover:bg-gray-700 rounded">
                Quản lý đơn hàng
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block p-2 w-full text-left hover:bg-gray-700 rounded"
              >
                Đăng xuất
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
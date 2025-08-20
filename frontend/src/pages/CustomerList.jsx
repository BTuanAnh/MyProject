import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function CustomerList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', fullName: '', address: '', phone: '', role: 'USER', password: '' });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error('Lỗi khi lấy danh sách khách hàng');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async () => {
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/admin/users/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Cập nhật khách hàng thành công');
      } else {
        await axios.post(`http://localhost:8080/admin/users`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Thêm khách hàng thành công');
      }
      setForm({ username: '', email: '', fullName: '', address: '', phone: '', role: 'USER', password: '' });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      toast.error('Lỗi lưu khách hàng: ' + (err.response?.data || err.message));
    }
  };

  const handleEdit = (u) => {
    setForm(u);
    setEditingId(u.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa khách hàng này?')) {
      try {
        await axios.delete(`http://localhost:8080/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Xóa khách hàng thành công');
        fetchUsers();
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error('Lỗi xóa khách hàng');
      }
    }
  };

  return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Quản lý khách hàng</h2>

        {/* Form Thêm/Sửa */}
        <div className="mb-4">
          <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input placeholder="Họ tên" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
          <input placeholder="Địa chỉ" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <input placeholder="Số điện thoại" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          {!editingId && <input placeholder="Mật khẩu" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />}
          <button onClick={handleSave}>{editingId ? 'Cập nhật' : 'Thêm'}</button>
        </div>

        {/* Bảng danh sách */}
        <table className="w-full border-collapse border">
          <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Họ tên</th>
            <th className="border p-2">Địa chỉ</th>
            <th className="border p-2">SĐT</th>
            <th className="border p-2">Hành động</th>
          </tr>
          </thead>
          <tbody>
          {users.map(u => (
              <tr key={u.id}>
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.username}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{u.fullName}</td>
                <td className="border p-2">{u.address}</td>
                <td className="border p-2">{u.phone}</td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(u)}>Sửa</button>
                  <button onClick={() => handleDelete(u.id)}>Xóa</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default CustomerList;

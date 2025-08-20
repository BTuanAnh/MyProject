import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Error parsing JWT:', e);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login form data:', form);
        try {
            const response = await axios.post('http://localhost:8080/auth/login', form, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Login response:', response.data);
            if (typeof response.data !== 'string') {
                throw new Error('Response không phải JWT token');
            }
            const token = response.data;
            localStorage.setItem('token', token);
            const decodedToken = parseJwt(token);
            const role = decodedToken?.roles?.includes('ADMIN') ? 'ADMIN' : 'USER';
            toast.success('Đăng nhập thành công!');
            if (role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        } catch (err) {
            console.error('Login error:', err.response?.status, err.response?.data);
            toast.error('Lỗi đăng nhập: ' + (err.response?.data || err.message));
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Tên đăng nhập"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-2 rounded w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/orders/admin', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err.response?.status, err.response?.data);
        toast.error('Lỗi khi lấy danh sách đơn hàng: ' + (err.response?.data || err.message));
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Danh sách đơn hàng</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Ngày đặt</th>
            <th className="border p-2">Trạng thái</th>
            <th className="border p-2">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.user.username}</td>
              <td className="border p-2">{new Date(order.orderDate).toLocaleString()}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">{order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
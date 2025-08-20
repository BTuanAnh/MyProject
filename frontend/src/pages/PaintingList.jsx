import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function PaintingList() {
  const [paintings, setPaintings] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    price: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Lấy danh sách tranh
  const fetchPaintings = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/paintings');
      setPaintings(res.data);
    } catch (err) {
      toast.error('Lỗi khi tải tranh: ' + err.message);
    }
  };

  useEffect(() => {
    fetchPaintings();
  }, []);

  // Xử lý input
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Xử lý chọn ảnh
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form (thêm hoặc sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append(
          "painting",
          new Blob([JSON.stringify({
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            category: formData.category,
          })], { type: "application/json" })
      );
      if (image) {
        form.append("image", image);
      }

      if (isEditing) {
        await axios.put(`http://localhost:8080/api/paintings/${formData.id}/upload`, form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Cập nhật tranh thành công");
      } else {
        await axios.post("http://localhost:8080/api/paintings/upload", form, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Thêm tranh thành công");
      }

      setFormData({ id: '', title: '', description: '', price: '', category: '' });
      setImage(null);
      setIsEditing(false);
      fetchPaintings();
    } catch (err) {
      toast.error("Lỗi: " + (err.response?.data || err.message));
    }
  };

  // Xóa tranh
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tranh này?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/paintings/${id}`);
      toast.success("Xóa tranh thành công");
      fetchPaintings();
    } catch (err) {
      toast.error("Lỗi khi xóa: " + err.message);
    }
  };

  // Chỉnh sửa tranh
  const handleEdit = (painting) => {
    setFormData({
      id: painting.id,
      title: painting.title,
      description: painting.description,
      price: painting.price,
      category: painting.category,
    });
    setIsEditing(true);
    setImage(null);
  };

  return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{isEditing ? "Sửa tranh" : "Thêm tranh"}</h2>
        <form onSubmit={handleSubmit} className="mb-6 space-y-3">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Tiêu đề" className="border p-2 w-full" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Mô tả" className="border p-2 w-full" required />
          <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Giá" className="border p-2 w-full" required />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Danh mục" className="border p-2 w-full" required />
          <input type="file" accept="image/*" onChange={handleImageChange} className="border p-2 w-full" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {isEditing ? "Cập nhật" : "Thêm"}
          </button>
          {isEditing && (
              <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: '', title: '', description: '', price: '', category: '' }); }} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
                Hủy
              </button>
          )}
        </form>

        <h2 className="text-xl font-bold mb-4">Danh sách tranh</h2>
        <table className="w-full border">
          <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Danh mục</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Hành động</th>
          </tr>
          </thead>
          <tbody>
          {paintings.map(p => (
              <tr key={p.id}>
                <td className="border p-2">{p.id}</td>
                <td className="border p-2">{p.title}</td>
                <td className="border p-2">{p.price}</td>
                <td className="border p-2">{p.category}</td>
                <td className="border p-2">
                  {p.imagePath && <img src={`http://localhost:8080${p.imagePath}`} alt={p.title} className="h-16" />}
                </td>
                <td className="border p-2">
                  <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">Sửa</button>
                  <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
}

export default PaintingList;

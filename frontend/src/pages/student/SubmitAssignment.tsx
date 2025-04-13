import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuthStore } from '../../stores/authStore';
import MDEditor from '@uiw/react-md-editor';

export default function SubmitAssignment() {
  const [subject, setSubject] = useState<'english' | 'math'>('english');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/assignment/store', {
        subject,
        title,
        content,
        studentId: user?.id,
      });
      alert('Berhasil submit!');
      navigate('/student/assignments');
    } catch (err) {
      alert('Gagal submit. Coba cek lagi.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">Submit Assignment</h2>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value as 'english' | 'math')}
          className="w-full border rounded-lg px-3 py-2"
        >
          <option value="ENGLISH">English</option>
          <option value="MATH">Math</option>
        </select>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          required
        />

        <MDEditor value={content} onChange={(value) => setContent(value || '')} />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
}

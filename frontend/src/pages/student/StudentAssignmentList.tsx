import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

type Assignment = {
  id: number;
  title: string;
  subject: string;
  content: string;
  grade?: {
    id: number;
    grade: string;
    feedback: string;
  };
};

export default function StudentAssignmentList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get(`/assignment/list?studentId=${user?.id}`);
        console.log('User ID:', user?.id);

        setAssignments(res.data.assignments);
      } catch (err) {
        console.error(err);
        alert('Gagal memuat data assignment');
      }
    };

    fetchAssignments();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daftar Assignment Saya</h2>
            <button
                onClick={() => navigate('/student/assignments/new')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
                + Submit Assignment
            </button>
        </div>

        {assignments.length === 0 ? (
          <p className="text-gray-500">Belum ada assignment.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((a) => (
              <li key={a.id} className="border rounded-lg p-4">
                <p className="font-semibold">{a.title} ({a.subject})</p>
                <p className="text-sm text-gray-600 mb-2">
                  Isi: {a.content.length > 100 ? `${a.content.slice(0, 100)}...` : a.content}
                </p>

                {a.grade ? (
                  <div className="bg-green-100 text-green-800 p-3 rounded-md mt-2">
                    <p className="font-medium">Nilai: {a.grade.grade}</p>
                    <p className="text-sm">Feedback: {a.grade.feedback}</p>
                  </div>
                ) : (
                  <p className="text-sm text-yellow-600">Belum dinilai</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

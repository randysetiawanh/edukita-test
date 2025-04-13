import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Navbar from '../../components/Navbar';

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
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get(`/assignment/list?studentId=${user?.id}`);
        setAssignments(res.data.assignments);
      } catch (err) {
        console.error(err);
        alert('Failed to load assignments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Assignments</h2>
            <button
              onClick={() => navigate('/student/assignments/new')}
              className="bg-blue-600 text-white px-2 py-2 rounded-md hover:bg-blue-700 transition"
            >
              + Submit Assignment
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="ml-2 text-sm text-gray-600">Loading assignments...</span>
            </div>
          ) : assignments.length === 0 ? (
            <p className="text-gray-500">No assignments yet.</p>
          ) : (
            <ul className="space-y-4">
              {assignments.map((a) => (
                <li key={a.id} className="border rounded-lg p-4">
                  <p className="font-semibold">
                    Subject : {a.title} ({a.subject})
                  </p>
                  <div className="text-sm mt-4 mb-6 text-gray-600 mb-2">
                    <p className="font-bold text-black-400">
                      Content :
                    </p>
                    <MarkdownPreview
                      source={a.content.length > 100 ? `${a.content.slice(0, 100)}...` : a.content}
                      style={{ backgroundColor: 'transparent', padding: 0 }}
                    />
                  </div>

                  {a.grade ? (
                    <div
                      className={`p-3 rounded-md mt-2 ${
                        Number(a.grade.grade) <= 50
                          ? 'bg-red-100 text-red-800'
                          : Number(a.grade.grade) <= 70 && Number(a.grade.grade) >= 51
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      <p className="font-medium">Grade: {a.grade.grade}</p>
                      <p className="text-sm">Feedback: {a.grade.feedback}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-yellow-600">Not graded yet.</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

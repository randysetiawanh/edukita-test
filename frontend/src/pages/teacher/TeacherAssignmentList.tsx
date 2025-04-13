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
  student: {
    name: string;
    email: string;
  };
  grade?: {
    id: number;
    grade: string;
    feedback: string;
  };
};

export default function TeacherAssignmentList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get('/assignment/list');
        setAssignments(res.data.assignments);
      } catch (err) {
        console.error(err);
        alert('Failed to load assignments');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Student Assignments</h2>
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
            <p className="text-gray-500">No assignments found.</p>
          ) : (
            <ul className="space-y-4">
              {assignments.map((a) => (
                <li key={a.id} className="border rounded-lg p-4">
                  <p className="font-semibold">
                    Subject : {a.title} ({a.subject})
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    From: {a.student.name} ({a.student.email})
                  </p>

                  <div className="text-sm mt-4 mb-6 text-gray-600 mb-2">
                    <p className="font-bold text-black-400">Content:</p>
                    <MarkdownPreview
                      source={a.content.length > 100 ? `${a.content.slice(0, 100)}...` : a.content}
                      style={{ backgroundColor: 'transparent', padding: 0 }}
                    />
                  </div>

                  {a.grade ? (
                    <div className="bg-green-100 text-green-800 p-3 rounded-md mt-2">
                      <p className="font-medium">Grade: {a.grade.grade}</p>
                      <p className="text-sm">Feedback: {a.grade.feedback}</p>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <button
                        onClick={() => navigate(`/teacher/grade/${a.id}`)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                      >
                        Give Grade
                      </button>
                    </div>
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

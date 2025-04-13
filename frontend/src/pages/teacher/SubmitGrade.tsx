import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { useAuthStore } from '../../stores/authStore';
import MarkdownPreview from '@uiw/react-markdown-preview';
import Navbar from '../../components/Navbar';
import { generateFeedbackAI } from '../../utils/generateFeedback';

export default function SubmitGrade() {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState<any>(null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const res = await api.get(`/assignment/list?id=${assignmentId}`);
        setAssignment(res.data.assignments[0]);
      } catch (err) {
        alert('Failed to load assignment.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(grade) < 0 || Number(grade) > 100) {
      alert("Grade must be between 0 and 100");
      return;
    }
      
    try {
      await api.post('/grades/store', {
        assignmentId: assignment.id,
        teacherId: user?.id,
        grade: Number(grade),
        feedback,
      });
      alert('Grade submitted!');
      navigate('/teacher/assignments');
    } catch (err) {
      alert('Failed to submit grade.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Assignment not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6">
          <h2 className="text-xl font-bold">Grade Assignment</h2>
          <p className="text-sm text-gray-600">
            <strong>Student:</strong> {assignment.student.name} ({assignment.student.email})
          </p>
          <p className="text-sm text-gray-600">
            <strong>Subject:</strong> {assignment.subject}
          </p>
          <div className="mt-4">
            <p className="font-bold mb-2">Content:</p>
            <MarkdownPreview source={assignment.content} style={{ backgroundColor: 'transparent', padding: 0 }} />
          </div>

          {assignment.grade ? (
            <div
              className={`p-3 rounded-md mt-2 ${
                Number(assignment.grade.grade) <= 50
                  ? 'bg-red-100 text-red-800'
                  : Number(assignment.grade.grade) <= 70 && Number(assignment.grade.grade) >= 51
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              <p className="font-medium">Already graded:</p>
              <p>Grade: {assignment.grade.grade}</p>
              <p>Feedback: {assignment.grade.feedback}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-1">Grade:</label>
                <input
                    type="number"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full border rounded-md px-3 py-2"
                    placeholder="0 - 100"
                    required
                    min={0}
                    max={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Feedback:</label>
                <button
                  type="button"
                  onClick={async () => {
                    if (!grade && grade !== '0') {
                      alert('Enter grade first.');
                      return;
                    }

                    try {
                      const result = await generateFeedbackAI(Number(grade));
                      setFeedback(result);
                      alert('Feedback generated.')
                    } catch (err) {
                      alert('Faildd generate feedback.');
                      console.error(err);
                    }
                  }}
                  className="text-sm text-blue-600 hover:underline mt-1 mb-2"
                >
                  🔮 Generate Feedback
                </button>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  rows={5}
                  required
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                    type="button"
                    onClick={() => navigate('/student/assignments')}
                    className="text-sm text-gray-600 hover:underline"
                >
                ← Back
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Submit Grade
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SubmitAssignment from '../pages/student/SubmitAssignment';
import StudentAssignmentList from '../pages/student/StudentAssignmentList';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/assignments/new" element={<SubmitAssignment />} />
        <Route path="/student/assignments" element={<StudentAssignmentList />} />
      </Routes>
    </Router>
  );
}

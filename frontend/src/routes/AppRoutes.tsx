import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SubmitAssignment from '../pages/student/SubmitAssignment';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/assignments/new" element={<SubmitAssignment />} />
        {/* Nanti tambahin route student dan teacher di sini */}
      </Routes>
    </Router>
  );
}

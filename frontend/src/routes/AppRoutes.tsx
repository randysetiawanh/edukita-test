import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SubmitAssignment from '../pages/student/SubmitAssignment';
import StudentAssignmentList from '../pages/student/StudentAssignmentList';
import PrivateRoute from '../components/PrivateRoute';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student/assignments/new"
          element={
            <PrivateRoute>
              <SubmitAssignment />
            </PrivateRoute>
          }
        />
        <Route path="/student/assignments" 
          element={
            <PrivateRoute>
              <StudentAssignmentList />
            </PrivateRoute>
          }        
        />
      </Routes>
    </Router>
  );
}

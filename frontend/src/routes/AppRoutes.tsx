import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import SubmitAssignment from '../pages/student/SubmitAssignment';
import StudentAssignmentList from '../pages/student/StudentAssignmentList';
import PrivateRoute from '../components/PrivateRoute';
import TeacherAssignmentList from '../pages/teacher/TeacherAssignmentList';
import SubmitGrade from '../pages/teacher/SubmitGrade';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/student/assignments/new"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <SubmitAssignment />
            </PrivateRoute>
          }
        />
        <Route path="/student/assignments" 
          element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentAssignmentList />
            </PrivateRoute>
          }        
        />
        <Route
          path="/teacher/assignments"
          element={
            <PrivateRoute allowedRoles={['teacher']}>
              <TeacherAssignmentList />
            </PrivateRoute>
          }
        />
        <Route
          path="/teacher/grade/:assignmentId"
          element={
            <PrivateRoute allowedRoles={['teacher']}>
              <SubmitGrade />
            </PrivateRoute>
          }
        />

      </Routes>
    </Router>
  );
}

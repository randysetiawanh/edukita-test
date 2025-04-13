import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md px-6 py-3 flex justify-end">
      <button
        onClick={handleLogout}
        className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
      >
        Logout
      </button>
    </header>
  );
}

// src/routes/Router.tsx

// src/routes/Router.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"
import Dashboard from "@/pages/Dashboard"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

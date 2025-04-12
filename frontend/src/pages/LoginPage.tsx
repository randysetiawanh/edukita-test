// src/pages/LoginPage.tsx

import { useState } from "react"
import axios from "@/api/axios"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../components/ui/button"

export default function LoginPage() {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post("/auth/login", { userId, password })
      const { token, user } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center gap-4"
      >
        <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white w-full">
          Welcome Back
        </h2>

        {error && (
          <div className="text-sm text-red-500 text-center w-full">{error}</div>
        )}

        <div className="w-full space-y-2">
          <Label htmlFor="userId">User ID</Label>
          <Input
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="w-full space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Login
        </Button>
      </form>
    </div>
  )
}

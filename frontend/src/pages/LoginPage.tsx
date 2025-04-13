// src/pages/LoginPage.tsx

import { useState } from "react"
import axios from "@/api/axios"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await axios.post("/auth/frontend-login", { email, password })
      const { token, user } = res.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      navigate("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-6">
          Login
        </h2>

        {error && (
          <p className="text-sm text-red-500 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>

          <Button
            type="submit"
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

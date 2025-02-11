'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { appRoutes } from '@/constants/appRoutes'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (result?.ok) {
      router.push(appRoutes.admin.players)
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-96 rounded-lg p-8 text-center shadow-lg"
      >
        <Image
          src="/img/hack-logo-black.png"
          width={150}
          height={150}
          alt="Logo"
          className="mx-auto mb-4"
        />
        <h2 className="mb-4 text-center text-xl font-bold">Login</h2>
        <input
          type="text"
          placeholder="usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded bg-slate-200 p-2 text-center"
          required
        />
        <input
          type="password"
          placeholder="contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded bg-slate-200 p-2 text-center"
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-2 font-bold text-black"
        >
          Login
        </button>
      </form>
    </div>
  )
}

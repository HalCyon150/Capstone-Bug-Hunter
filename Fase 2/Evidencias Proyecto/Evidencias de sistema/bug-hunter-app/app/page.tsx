import { AuthButton } from "@/components/auth-button"
import { auth } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#1E293B] border border-gray-800 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6 text-center">
        <div className="text-4xl">🪲</div>
        <h1 className="text-2xl font-bold">BugHunter</h1>
        <p className="text-sm text-gray-400">
          Plataforma de desafíos prácticos de desarrollo de software para estudiantes de Duoc UC.
        </p>

        <div className="w-full pt-4 border-t border-gray-800 flex justify-center">
          <AuthButton />
        </div>

        {session && (
          <div className="w-full bg-[#0F172A] p-4 rounded-xl text-left text-xs font-mono text-gray-300 border border-gray-800">
            <p className="text-yellow-400 font-semibold mb-2">Datos de Sesión Activa:</p>
            <p>ID: {session.user?.id}</p>
            <p>Email: {session.user?.email}</p>
            <p>GitHub: @{session.user?.githubUsername}</p>
            <p>Rol: {session.user?.role}</p>
          </div>
        )}
      </div>
    </main>
  )
}
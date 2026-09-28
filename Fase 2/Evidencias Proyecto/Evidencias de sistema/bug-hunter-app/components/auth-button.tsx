import { auth, signIn, signOut } from "@/auth"

export async function AuthButton() {
  const session = await auth()

  // 1. Estado inicial: No autenticado
  if (!session?.user) {
    return (
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button
          type="submit"
          className="bg-white hover:bg-gray-100 text-gray-900 font-semibold px-5 py-2.5 rounded-xl text-sm transition flex items-center gap-3 shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          Ingresar con correo institucional Duoc UC
        </button>
      </form>
    )
  }

  // 2. Estado Intermedio: Cuenta Duoc iniciada, pero falta vincular GitHub
  if (!session.user.isGitHubLinked) {
    return (
      <div className="flex flex-col items-center gap-4 bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl text-center max-w-sm">
        <div className="text-amber-400 font-medium text-sm">
          ⚠️ Falta 1 paso para activar tu cuenta
        </div>
        <p className="text-xs text-gray-300">
          Identidad validada como <strong>{session.user.email}</strong>. Ahora vincula tu GitHub para asignarte repositorios y verificar tus Pull Requests.
        </p>
        <form
          action={async () => {
            "use server"
            await signIn("github")
          }}
        >
          <button
            type="submit"
            className="bg-[#24292F] hover:bg-[#1a1e22] text-white font-medium px-4 py-2 rounded-lg text-xs transition border border-gray-700"
          >
            Vincular cuenta de GitHub
          </button>
        </form>
      </div>
    )
  }

  // 3. Estado Completo: Ambas cuentas vinculadas
  return (
    <div className="flex items-center justify-between w-full max-w-md bg-[#0F172A] border border-gray-800 p-3 rounded-xl">
      <div className="flex items-center gap-3">
        {session.user.image ? (
          <img
            src={session.user.image}
            alt={session.user.name ?? "Avatar"}
            className="w-10 h-10 rounded-full border border-gray-700"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm">
            {session.user.name?.charAt(0) ?? "U"}
          </div>
        )}
        <div className="text-left text-xs">
          <p className="font-semibold text-white">{session.user.name}</p>
          <p className="text-gray-400">{session.user.email}</p>
          <p className="text-emerald-400 font-mono mt-0.5">✓ GitHub vinculado</p>
        </div>
      </div>

      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button
          type="submit"
          className="text-xs text-red-400 hover:text-red-300 border border-red-500/30 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition"
        >
          Salir
        </button>
      </form>
    </div>
  )
}
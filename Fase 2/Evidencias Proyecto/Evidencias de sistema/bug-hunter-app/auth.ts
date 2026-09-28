import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import { Role } from "@prisma/client"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          githubUsername: profile.login,
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email?.toLowerCase() ?? ""
        const isDuocStudent = email.endsWith("@duocuc.cl")
        const isDuocTeacher = email.endsWith("@profesor.duoc.cl")

        if (!isDuocStudent && !isDuocTeacher) {
          console.warn(`[Auth] Dominio rechazado: ${email}`)
          return false
        }
      }
      return true
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id

        // Buscar si el usuario ya tiene vinculada una cuenta de GitHub en la tabla Account
        const githubAccount = await prisma.account.findFirst({
          where: {
            userId: user.id,
            provider: "github",
          },
        })

        // Guardamos si tiene GitHub vinculado y el username
        session.user.githubUsername = user.githubUsername ?? null
        // @ts-expect-error bandera personalizada para saber si ya vinculó ambas
        session.user.isGitHubLinked = Boolean(githubAccount)
        session.user.role = user.role
      }
      return session
    },
  },
})
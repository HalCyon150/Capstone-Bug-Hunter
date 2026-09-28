import { Role } from "@prisma/client"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      githubUsername?: string | null
      isGitHubLinked: boolean
      role: Role
    } & DefaultSession["user"]
  }

  interface User {
    githubUsername?: string | null
    role: Role
  }
}
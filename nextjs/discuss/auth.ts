import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";

// Extend NextAuth session type to include 'id'
declare module "next-auth" {
  interface Session {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        image?: string | null;
    };
  } 
}
if(!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET || !process.env.AUTH_SECRET) {
    throw new Error("Missing environment variables for authentication");
}

const prisma = new PrismaClient();

export const auth = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
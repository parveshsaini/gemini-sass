import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client";
import { Adapter } from "next-auth/adapters";

const authOptions: NextAuthOptions= {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
      async redirect({ url, baseUrl }) {
        // Redirect to the dashboard if the user is signing in
        if (url.startsWith(baseUrl)) {
          return `${baseUrl}/dashboard`;
        }
        // Otherwise, return to the homepage or any other page
        return baseUrl;
      },
    },
    session: {
      strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
  }

  export default authOptions
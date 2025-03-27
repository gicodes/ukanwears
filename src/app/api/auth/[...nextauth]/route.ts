import dotenv from "dotenv";
dotenv.config();

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";

const { JWT_SECRET } = process.env;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await User.findOne({ where: { email: credentials.email } });
        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, { expiresIn: "1h" });

        return { id: user.id.toString(), name: user.name, email: user.email };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: { id: string; token?: string } }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.token = token.token;
      return session;
    }
  },
  secret: JWT_SECRET,
  pages: {
    signIn: "/auth/signin"
  }
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

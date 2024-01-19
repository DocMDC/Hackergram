import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import { env } from "../env";
import { db } from "./db";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { randomUUID } from "crypto";
// import { GithubProfile } from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

// import { GoogleProfile } from "next-auth/providers/google";
//May be helpful to see the entire github profile schema: https://github.com/nextauthjs/next-auth/blob/v4/packages/next-auth/src/providers/github.ts

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      login: string;
      // ...other properties
      role: string;
    } & DefaultSession["user"];
  }

  //Must include this interface to allow sesssion access to user.role and user.name
  interface User {
    role: string;
    name?: string;
    // login: string;
    // password: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      name: "Sign In",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;
        // Add logic here to look up the user from the credentials supplied

        const user = await db.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if (user && user.password) {
          const match = bcrypt.compare(credentials.password, user.password);

          if (!match) {
            return null;
          }

          const {
            id,
            email,
            emailVerified,
            password,
            image,
            profileImage,
            login,
            role,
          } = user;
          const name = user.name ?? undefined;

          return {
            id,
            name,
            email,
            emailVerified,
            password,
            image,
            profileImage,
            login,
            role,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
    }),
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
  },
  //can add custom pages in place of the default sign in and sign out pages if desired
  // pages: {

  // }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);

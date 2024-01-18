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
    name: string;
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
      // profile(profile: GithubProfile): {
      //   name: string;
      //   email: string | null | undefined;
      //   role: string;
      //   id: string;
      //   image: string;
      // } {
      //   return {
      //     //this will populate the user schema based on information pulled from the auth provider
      //     name: profile.login,
      //     email: profile.email,
      //     role: "user",
      //     id: profile.id.toString(),
      //     image: profile.avatar_url,
      //   };
      // },
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),

    GoogleProvider({
      // profile(profile: GoogleProfile): {
      //   name: string;
      //   email: string | null | undefined;
      //   role: string;
      //   id: string;
      //   image: string;
      // } {
      //   return {
      //     //this will populate the user schema based on information pulled from the auth provider
      //     name: profile.name,
      //     email: profile.email,
      //     role: "user",
      //     id: profile.iss,
      //     image: profile.picture,
      //   };
      // },
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Sign In",
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "email",
    //       placeholder: "email@example.com",
    //     },
    //     password: {
    //       label: "Password",
    //       type: "password",
    //     },
    //   },
    //   async authorize(credentials) {
    //     if (!credentials || !credentials.email || !credentials.password) return null;
    //     // Add logic here to look up the user from the credentials supplied

    //     const user = await db.user.findFirst({
    //       where: {
    //         email: credentials.email
    //       },
    //     });

    //       //deal password encryption
    //     if (user && user.password === credentials.password) {
    //       const { password, } = user
    //       return user as User
    //     } else {
    //       return null
    //     }
    //   },
    // }),
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

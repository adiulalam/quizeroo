import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env";
import { db } from "@/server/db";
import { z } from "zod";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers:
    process.env.WSS !== "true"
      ? [
          Auth0Provider({
            clientId: env.AUTH0_CLIENT_ID,
            clientSecret: env.AUTH0_CLIENT_SECRET,
            issuer: env.AUTH0_ISSUER,
            authorization: {
              params: {
                prompt: "login",
              },
            },
          }),
          CredentialsProvider({
            name: "Credentials",
            credentials: {
              quizSessionId: {
                label: "Quiz Session Id",
                type: "text",
              },
              username: { label: "Username", type: "text" },
            },
            async authorize(credentials) {
              const creds = await z
                .object({
                  username: z.string().min(1),
                  quizSessionId: z.string().uuid(),
                })
                .parseAsync(credentials);

              const user = await db.tempUser.findFirst({
                where: {
                  name: creds.username,
                  quizSessionId: creds.quizSessionId,
                },
              });

              if (user) {
                return { ...user, isTempUser: true };
              } else {
                return null;
              }
            },
          }),
        ]
      : [],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};

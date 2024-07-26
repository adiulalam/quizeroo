import { PrismaAdapter } from "@auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import { Auth0Provider, CredentialsProvider } from "./providers";
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
      isTempUser: boolean;
      // ...other properties
      // role: UserRole;
    };
  }

  interface User {
    isTempUser: boolean;
    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) token.isTempUser = user?.isTempUser ?? false;
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isTempUser: token?.isTempUser ?? false,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
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
      authorize: async (credentials) => {
        const creds = await z
          .object({
            username: z.string().min(1),
            quizSessionId: z.string().uuid(),
          })
          .parseAsync(credentials);

        const user = await db.user.create({
          data: {
            name: creds.username,
            isTempUser: true,
            isActive: true,
            quizSessionId: creds.quizSessionId,
          },
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
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

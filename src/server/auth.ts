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
import { mutateTempUserSchema } from "./schema/user.schema";
import { createTempUserHandler } from "./controller/user.controller";
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
    jwt: async ({ token, user, trigger, session }) => {
      if (user) token.isTempUser = user?.isTempUser ?? false;

      const name = (session as { name: string | null })?.name;

      if (trigger === "update" && name && name.length > 0) {
        token.name = name;
      }

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
      id: "auth0",
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
      id: "temp-user-login",
      name: "Credentials",
      credentials: {
        quizSessionId: {
          label: "Quiz Session Id",
          type: "text",
        },
        name: { label: "Name", type: "text" },
      },
      authorize: async (credentials) => {
        const creds = await mutateTempUserSchema.parseAsync(credentials);

        const user = await createTempUserHandler({ input: creds });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    ...(process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "development"
      ? [
          CredentialsProvider({
            id: "test-login",
            name: "TestCredentials",
            credentials: {
              email: {
                label: "Email",
                type: "email",
                placeholder: "email@email.com",
              },
            },
            authorize: async (credentials) => {
              // todo: add a hardcoded id to check from
              const creds = await z
                .object({
                  email: z.string().email(),
                })
                .parseAsync(credentials);

              const user = await db.user.findFirstOrThrow({
                where: {
                  email: creds.email,
                },
              });

              if (user) {
                return user;
              } else {
                return null;
              }
            },
          }),
        ]
      : []),
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

import type {
  CredentialInput,
  CredentialsConfig,
} from "next-auth/providers/credentials";
import type { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

interface Auth0Profile extends Record<string, unknown> {
  sub: string;
  nickname: string;
  email: string;
  picture: string;
  isTempUser: boolean;
}

function Auth0<P extends Auth0Profile>(
  options: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "auth0",
    name: "Auth0",
    wellKnown: `${options.issuer}/.well-known/openid-configuration`,
    type: "oauth",
    authorization: { params: { scope: "openid email profile" } },
    checks: ["pkce", "state"],
    idToken: true,
    profile: (profile) => {
      return {
        id: profile.sub,
        name: profile.nickname,
        email: profile.email,
        image: profile.picture,
        isTempUser: profile?.isTempUser ?? false,
      };
    },
    style: { logo: "/auth0.svg", text: "#fff", bg: "#EB5424" },
    options,
  };
}

type UserCredentialsConfig<C extends Record<string, CredentialInput>> = Partial<
  Omit<CredentialsConfig<C>, "options">
> &
  Pick<CredentialsConfig<C>, "authorize" | "credentials">;

function Credentials<
  C extends Record<string, CredentialInput> = Record<string, CredentialInput>,
>(options: UserCredentialsConfig<C>): CredentialsConfig<C> {
  return {
    id: "credentials",
    name: "Credentials",
    type: "credentials",
    credentials: {} as C,
    authorize: () => null,
    options,
  };
}

export { Auth0 as Auth0Provider, Credentials as CredentialsProvider };

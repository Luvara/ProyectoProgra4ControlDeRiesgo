import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (typeof value !== 'string') { 
    throw new Error(`Environment variable ${key} is not set!`);
  }
  return value;
}

interface UserSession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  accessToken?: string | null;
}

const handler = NextAuth({
  providers: [
    AzureADProvider({
      clientId: getEnvVariable('AZURE_AD_CLIENT_ID'),
      clientSecret: getEnvVariable('AZURE_AD_CLIENT_SECRET'),
      tenantId: getEnvVariable('AZURE_AD_TENANT_ID'),
      authorization: { params: { scope: "openid profile email" } },
    }),
  ],
  callbacks: {
 
    async jwt({ token, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name ?? null,
        email: token.email ?? null,
        image: token.picture ?? null,
        accessToken: token.accessToken ?? null
      } as UserSession;
      return session;
    }
  },
  pages: {
    error: '/auth/error',  // Página de error personalizada
    signOut: '/auth/signout'  // Página de cierre de sesión personalizada
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };

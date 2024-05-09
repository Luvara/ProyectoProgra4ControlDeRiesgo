import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import prisma from "@/lib/prisma"; // Asegúrate de ajustar la importación según tu configuración de Prisma

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
    },
    async signIn({ user, account, profile }) {
      if (user.email) {
        // Verificar si el email está en la base de datos
        const emailExists = await prisma.user.findUnique({
          where: {
            usu_email: user.email
          }
        });
        return !!emailExists;  // Si existe el email, continuar con el inicio de sesión
      }
      return false;  // No permitir el inicio de sesión si no hay email o no se encuentra en la base de datos
    }
  },
  pages: {
    error: '/auth/error',  // Custom error page
    signOut: '/auth/signout'  // Custom signout page
  },
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };

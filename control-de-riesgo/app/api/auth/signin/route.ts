// app/api/auth/signin/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.AZURE_AD_CLIENT_ID;
  const tenantId = process.env.AZURE_AD_TENANT_ID;
  const redirectUri = encodeURIComponent(`${process.env.NEXTAUTH_URL}api/auth/callback/azure-ad`);
  const state = "someRandomStateValue"; // Puedes generar un valor aleatorio o usar uno proporcionado por NextAuth

  const authorizationUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&scope=openid%20profile%20email&response_type=code&redirect_uri=${redirectUri}&state=${state}`;

  return NextResponse.redirect(authorizationUrl);
}

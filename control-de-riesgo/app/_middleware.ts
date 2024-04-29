// pages/_middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { JWT } from 'next-auth/jwt';


// Tipado explícito para el middleware
export async function middleware(req: NextRequest) {
  // Especifica el secreto directamente o asegúrate de que está definido
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error("SECRET is not defined in the environment");
  }

  const session: JWT | null = await getToken({ req, secret });

  const { pathname } = req.nextUrl;

  // Redirigir si el usuario está autenticado y accede a la página de login
  if (session && pathname === '/login') {
    const url = req.nextUrl.clone(); // Clona la URL actual para modificarla
    url.pathname = '/homePage'; // Cambia el pathname a la página principal
    return NextResponse.redirect(url);
  }

  // Redirigir si el usuario no está autenticado y accede a una página protegida
  if (!session && pathname.startsWith('/protected')) {
    const url = req.nextUrl.clone(); // Clona la URL actual para modificarla
    url.pathname = '/login'; // Cambia el pathname a la página de login
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

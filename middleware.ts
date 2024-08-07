import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const tokenCookie = req.cookies.get('serbapremiumId');
  const token = tokenCookie ? tokenCookie.value : null;

  // Daftar rute yang membutuhkan autentikasi
  const protectedRoutes = ['/admin/dashboard', '/dashboard'];
  // Daftar rute yang tidak boleh diakses jika sudah login
  const restrictedRoutes = ['/login', '/signup'];

  // Jika pengguna mencoba mengakses rute yang dilindungi dan tidak memiliki token
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Jika pengguna mencoba mengakses rute login/signup tetapi sudah memiliki token
  if (restrictedRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  }

  return NextResponse.next();
}

// Konfigurasi matcher untuk middleware
export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/login', '/signup'], // Middleware diterapkan pada rute yang ditentukan
};

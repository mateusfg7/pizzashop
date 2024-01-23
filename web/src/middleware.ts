import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAuthenticated = request.cookies.get('auth') !== undefined

  if (
    !pathname.startsWith('/sign-up') &&
    !pathname.startsWith('/sign-in') &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

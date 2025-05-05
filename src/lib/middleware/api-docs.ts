import { NextRequest, NextResponse } from 'next/server';

export function apiDocsMiddleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/docs')) {
    return NextResponse.next();
  }
  return NextResponse.redirect('/');
}
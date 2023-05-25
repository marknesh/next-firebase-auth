import { adminAuth } from '@/lib/firebaseAdmin';
import { CookieSerializeOptions, serialize } from 'cookie';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idToken = searchParams.get('idToken');

  if (!idToken) {
    return NextResponse.json(
      { error: 'Missing idToken parameter' },
      { status: 401 }
    );
  }

  // Set session expiration to 7 days in milliseconds.
  const expiresIn = 7 * 24 * 60 * 60 * 1000;
  // Set session expiration to 7 days in seconds.
  const expiresInSeconds = 7 * 60 * 60 * 24;

  return adminAuth.createSessionCookie(idToken, { expiresIn }).then(
    (sessionCookie) => {
      const options: CookieSerializeOptions = {
        httpOnly: true,
        secure: true,
        maxAge: expiresInSeconds,
        path: '/',
        sameSite: 'strict',
      };

      return NextResponse.json(
        { success: true },
        {
          headers: {
            'Set-Cookie': serialize('session', sessionCookie, options),
          },
        }
      );
    },
    (error) => {
      return NextResponse.json(
        {
          message:
            error.message || 'An error has occurred. Please try again later.',
        },
        { status: 401 }
      );
    }
  );
}

import { adminAuth } from '@/lib/firebaseAdmin';
import { cookies } from 'next/headers';

export const checkIfLoggedIn = async () => {
  const sessionCookie = cookies().get('session')?.value;
  try {
    if (sessionCookie) {
      const decodedClaims = await adminAuth.verifySessionCookie(
        sessionCookie,
        true
      );

      if (decodedClaims?.uid) {
        return decodedClaims;
      }
    }
  } catch (error) {
    return;
  }
};

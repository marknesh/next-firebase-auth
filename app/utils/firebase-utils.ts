import { auth } from '@/firebase';
import {
  ActionCodeSettings,
  AuthError,
  sendSignInLinkToEmail,
} from 'firebase/auth';

const actionCodeSettings: ActionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  //Please remember to replace the URL with the appropriate value for production.
  url: (process.env.NODE_ENV !== 'production'
    ? `${process.env.NEXT_PUBLIC_EMAIL_LINK_DEVELOPMENT_URL}`
    : `${process.env.NEXT_PUBLIC_EMAIL_LINK_PRODUCTION_URL}`) as string,
  handleCodeInApp: true,
};

export async function sendEmailLink(email: string) {
  return new Promise((resolve, reject) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        resolve('success');
      })
      .catch((error: AuthError) => {
        reject(error);
      });
  });
}

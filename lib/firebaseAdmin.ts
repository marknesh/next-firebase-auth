import { initializeApp, cert, getApps, getApp, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';

//The emulatorProjectId is the project id that
//you use when starting the firebase emulator.

const emulatorProjectId = process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_PROJECT_ID;

const app: App =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        projectId:
          typeof window !== 'undefined' &&
          window.location.hostname === 'localhost'
            ? emulatorProjectId
            : process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
          clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
            /\\n/g,
            '\n'
          ),
        }),
      });

const adminAuth = getAuth(app);

export { adminAuth };

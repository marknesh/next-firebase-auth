'use client';
import { showErrorMessage } from '@/app/utils/showErrorMessage';
import Button from '@/components/Button';
import { auth } from '@/firebase';
import axios from 'axios';
import {
  AuthError,
  UserCredential,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import Link from 'next/link';
import {
  ReadonlyURLSearchParams,
  redirect,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

const MagicLinkLogin = () => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const urlHasAllProperties = () => {
    const requiredProperties = ['mode', 'apiKey', 'lang', 'oobCode'];
    return (
      searchParams &&
      requiredProperties.every(
        (prop) => searchParams.has(prop) && searchParams.get(prop)
      )
    );
  };

  if (Object.keys(searchParams as {}).length === 0 || !urlHasAllProperties()) {
    redirect('/signin');
  }

  const [createSessionCookieError, setCreateSessionCookieError] =
    useState<AuthError | null>(null);

  const router = useRouter();

  useEffect(() => {
    const verifyEmailLink = () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email: string | null =
          window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation');
          if (!email?.trim()) {
            return router.replace('/');
          }
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email!, window.location.href)
          .then(async (result: UserCredential) => {
            const idToken = await result.user.getIdToken();

            await axios
              .get('/api/createSessionCookie', {
                params: { idToken },
              })
              .then(() => {
                // Clear email from storage.
                window.localStorage.removeItem('emailForSignIn');
                router.replace('/');
                // You can access the new user via result.user
                // Additional user info profile not available via:
                // result.additionalUserInfo.profile == null
                // You can check if the user is new or existing:
                // result.additionalUserInfo.isNewUser
              })
              .catch((error) => {
                setCreateSessionCookieError(error?.response?.data);
              });
          })
          .catch((error) => {
            if (error) {
              return router.push('/invalidLink');
            }
          });
      } else {
        return router.replace('/');
      }
    };
    verifyEmailLink();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (createSessionCookieError) {
    showErrorMessage(createSessionCookieError);
    return (
      <div className='-mt-10 flex flex-col  max-w-xl space-y-2'>
        <h1 className='text-xl text-center '>
          Oops! An error has occurred. Please try again later.
        </h1>
        <Link href='/signin'>
          <Button className='w-2/6'>Sign in</Button>
        </Link>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className='-mt-4'>
      <div className='w-10 h-10 animate-bounce mb-3 bg-gray-900 border-2 border-stone-200 shadow-2xl rounded-full mx-auto' />
      <p className='text-gray-900 text-center'>
        Sit tight! We&apos;re securely signing you in...
      </p>
    </div>
  );
};

export default MagicLinkLogin;

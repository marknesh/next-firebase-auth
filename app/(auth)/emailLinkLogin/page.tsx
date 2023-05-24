'use client';
import { showErrorMessage } from '@/app/utils/showErrorMessage';
import { auth } from '@/firebase';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

const EmailLinkLogin = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const router = useRouter();

  const urlHasAllProperties = () => {
    const requiredProperties = ['mode', 'apiKey', 'lang', 'oobCode'];
    return (
      searchParams &&
      requiredProperties.every(
        (prop) => searchParams.hasOwnProperty(prop) && searchParams[prop]
      )
    );
  };

  if (Object.keys(searchParams as {}).length === 0 || !urlHasAllProperties()) {
    return redirect('/signin');
  }

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
            if(error){
              return router.push("/invalidLink")
            }
            // showErrorMessage(error);
            // router.push('/');
          });
      } else {
        return router.replace('/');
      }
    };
    verifyEmailLink();
  }, []);

  return (
    <div className='-mt-4'>
      <div className='w-10 h-10 animate-bounce mb-3 bg-gray-900 border-2 border-stone-200 shadow-2xl rounded-full mx-auto' />
      <p className='text-gray-900'>
        Sit tight! We're securely signing you in...
      </p>
      <ToastContainer />
    </div>
  );
};

export default EmailLinkLogin;

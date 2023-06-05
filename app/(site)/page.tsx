import Button from '@/components/Button';
import { checkIfLoggedIn } from '@/utils/checkIfLoggedIn';
import Link from 'next/link';

export default async function Home() {
  const user = await checkIfLoggedIn();
  return (
    <div className="flex flex-col space-y-10 justify-center items-center min-h-[80vh]">
      <div className="flex flex-col space-y-3 md:space-y-2 justify-center items-center ">
        <h1 className="text-4xl font-semibold text-center text-gray-900">
          Next.js 13 Firebase Auth Starter Template
        </h1>
        <p className="text-gray-500 text-center">
          This is a Next.js starter kit that uses Firebase Email Link for simple
          and secure passwordless login.
        </p>
      </div>

      {!user ? (
        <Link href="/signin">
          <Button data-testid="loginButton" className="w-32 mt-10">
            Login
          </Button>
        </Link>
      ) : (
        <p className="text-gray-900 text-lg">You are logged in</p>
      )}
    </div>
  );
}

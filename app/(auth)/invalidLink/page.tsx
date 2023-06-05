import Button from '@/components/Button';
import Link from 'next/link';

const InvalidLink = async () => {
  return (
    <div className="-mt-10 flex flex-col  max-w-xl space-y-2">
      <h1 className="text-xl text-center ">
        Oops! The magic link has expired or is invalid. Please sign in to
        request a new link.
      </h1>
      <Link href="/signin">
        <Button className="w-2/6">Sign in</Button>
      </Link>
    </div>
  );
};

export default InvalidLink;

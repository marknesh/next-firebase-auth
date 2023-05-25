import { redirect } from 'next/navigation';

const CheckEmail = async ({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const email = searchParams?.email;

  if (!email) {
    return redirect('/signin');
  }
  return (
    <div className='-mt-10 flex flex-col text-center space-y-4'>
      <h1 className='text-2xl  font-semibold'>Check your email</h1>
      <p>
        We&apos;ve just sent a magic link to{' '}
        <span className='font-semibold'>{email}</span>
      </p>
    </div>
  );
};

export default CheckEmail;

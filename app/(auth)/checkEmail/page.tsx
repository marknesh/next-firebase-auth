import { redirect } from 'next/navigation';

const CheckEmail = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const email = searchParams?.email;

  if (!email) {
    redirect('/signin');
  }
  return (
    <div className='-mt-10 flex flex-col space-y-2'>
      <h1 className='text-2xl text-center font-semibold'>Check your email</h1>
      <p>
        We've just sent a magic link to{' '}
        <span className='font-semibold'>{email}</span>
      </p>
    </div>
  );
};

export default CheckEmail;

'use client';
import { SigninForm } from '@/types/formData';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { sendEmailLink } from '@/app/utils/firebase-utils';
import { AuthError } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm>();

  const router = useRouter();

  const onSubmit = (data: SigninForm) => {
    return sendEmailLink(data.email)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', data.email);
        router.push('/checkYourEmail');
      })
      .catch((error: AuthError) => {
        console.log(error);
      });
  };

  return (
    <div className='bg-white w-11/12   md:w-full max-w-md flex flex-col space-y-7  py-7 rounded-xl'>
      <h1 className='text-2xl text-center font-semibold'>Welcome back</h1>

      <div className='w-11/12 mx-auto'>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
          <input
            type='email'
            className='bg-transparent w-full  px-3  h-10 border rounded-full border-gray-300 focus:ring-0 focus:outline-none'
            {...register('email', { required: true })}
            placeholder='Email address'
          />
          {errors.email && <span className='formError'>Email is required</span>}

          <button className='formSubmitButton'>Send Email Link</button>
        </form>

        <p className='text-gray-500 pt-4 text-sm text-center '>
          Don't have an account?{' '}
          <Link
            href='/signup'
            className='text-gray-800 cursor-pointer font-semibold'
          >
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;

'use client';
import { SignupForm } from '@/types/formData';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { sendEmailLink } from '@/utils/firebase-utils';
import { AuthError } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { useState } from 'react';
import { showErrorMessage } from '@/utils/showErrorMessage';
import { ToastContainer } from 'react-toastify';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>();

  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = (data: SignupForm) => {
    setLoading(true);
    return sendEmailLink(data.email)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', data.email);
        router.push(`/checkEmail?email=${data.email}`);
      })
      .catch((error: AuthError) => {
        setLoading(false);
        showErrorMessage(error);
      });
  };

  return (
    <div className="bg-white w-11/12   md:w-full max-w-md flex flex-col space-y-7  py-7 rounded-xl">
      <h1 className="text-2xl text-center font-semibold">Create an account</h1>

      <div className="w-11/12 mx-auto">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            className="emailInput"
            {...register('email', { required: true })}
            placeholder="Email address"
          />
          {errors.email && <span className="formError">Email is required</span>}

          <Button loading={loading}>Send Magic Link</Button>
        </form>

        <p className="text-gray-500 pt-4 text-sm text-center ">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="text-gray-800 cursor-pointer font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

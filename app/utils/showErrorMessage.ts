import { toast } from 'react-toastify';

interface Error {
  message: string;
  code: string;
}

export const showErrorMessage = (error: Error) => {
  return toast.error(
    error?.message
      ? error.message
      : 'An error has occurred. Please try again later'
  );
};

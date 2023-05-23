import { BeatLoader } from 'react-spinners';

interface ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { children, loading, className } = props;

  return (
    <button
      disabled={loading}
      className={`${className} h-10 flex justify-center items-center ${
        loading && 'bg-gray-200 hover:bg-gray-200 disabled:cursor-not-allowed'
      } `}
    >
      {!loading ? (
        children
      ) : (
        <BeatLoader color={'light-gray'} size={9} loading={loading} />
      )}
    </button>
  );
};

export default Button;

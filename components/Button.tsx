import { BeatLoader } from 'react-spinners';

interface ButtonProps {
  id?: string;
  loading?: boolean;
  children: React.ReactNode;
  className?: string;
  'data-testid'?: string;
}

const Button = (props: ButtonProps) => {
  const { children, loading, className } = props;

  return (
    <button
      disabled={loading}
      className={`${className} button mx-auto h-10 flex justify-center items-center ${
        loading && 'bg-gray-200 hover:bg-gray-200 disabled:cursor-not-allowed'
      } `}
      data-testid={props['data-testid']}
    >
      {!loading ? (
        children
      ) : (
        <BeatLoader color={'gray'} size={9} loading={loading} />
      )}
    </button>
  );
};

export default Button;

import { PropsWithChildren } from 'react';

export type ButtonProps = PropsWithChildren<{
  onClick: () => void;
}>;

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className='h-8 px-2.5 rounded-md text-white bg-blue-400 flex justify-center items-center'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

import { PropsWithChildren } from 'react';

export type CollapsibleProps = PropsWithChildren<{
  title: string;
}>;

export const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = ({
  title,
  children,
}) => {
  return (
    <details className='flex-1'>
      <summary className='flex justify-between items-center mb-2'>
        <h2 className='font-bold text-lg  cursor-pointer underline text-blue-500 hover:text-blue-800'>
          {title}
        </h2>
      </summary>

      {children}
    </details>
  );
};

import { PropsWithChildren } from 'react';

export type ContainerProps = PropsWithChildren<{
  title: string;
  bottom?: string | JSX.Element;
}>;

export const Container: React.FC<PropsWithChildren<ContainerProps>> = ({
  children,
  title,
  bottom,
}) => {
  const isStringLegend = typeof bottom === 'string';

  return (
    <div className='w-500px flex flex-col gap-4 items-center bg-white m-auto p-10 rounded-lg shadow-lg'>
      <h1 className='font-bold text-xl'>{title}</h1>
      <div className='flex w-full gap-3'>{children}</div>

      {isStringLegend && <p className='text-base'>{bottom}</p>}
      {!isStringLegend && bottom}
    </div>
  );
};

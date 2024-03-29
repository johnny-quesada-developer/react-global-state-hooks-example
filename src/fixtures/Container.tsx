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
    <div className='max-w-xs sm sm:max-w-xl md:max-w-xl lg:max-w-5xl flex flex-col gap-4 bg-white p-3 md:p-10 rounded-lg shadow-lg h-fit'>
      <h1 className='font-bold text-xl'>{title}</h1>
      <div className='flex gap-3'>{children}</div>

      {isStringLegend && <p className='text-base'>{bottom}</p>}
      {!isStringLegend && bottom}
    </div>
  );
};

import React from 'react';
import { FaRegLightbulb, FaLightbulb } from 'react-icons/fa';
import { useTheme } from '../states';

export const ThemeButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const [theme, actions] = useTheme();

  return (
    <button
      title='Toggle theme'
      {...props}
      onClick={actions.toggle}
      className={[
        'bg-blue-500 hover:bg-blue-700',
        'text-white',
        'font-bold',
        'px-4 py-2',
        'w-10',
        'flex items-center justify-center',
        'rounded-full',
        props.className,
      ].join(' ')}
    >
      <span>
        {theme === 'light' ? (
          <FaLightbulb className=' animate-fadeIn' fontSize={20} />
        ) : (
          <FaRegLightbulb className=' animate-fadeIn' fontSize={20} />
        )}
      </span>
    </button>
  );
};

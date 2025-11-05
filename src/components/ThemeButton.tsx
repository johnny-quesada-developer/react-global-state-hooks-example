import React from 'react';
import { FaRegLightbulb, FaLightbulb } from 'react-icons/fa';
import { theme } from '../states';
import merge from 'easy-css-merge';

export const ThemeButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    const [themeValue] = theme.use();

    return (
        <button
            title="Toggle theme"
            {...props}
            onClick={() => theme.actions.toggle()}
            className={merge(
                'bg-blue-500 hover:bg-blue-700',
                'text-white font-bold',
                'px-4 py-2 w-10',
                'flex items-center justify-center',
                'rounded-full',
                props.className
            )}
        >
            <span>
                {themeValue === 'light' ? (
                    <FaLightbulb className=" animate-fadeIn" fontSize={20} />
                ) : (
                    <FaRegLightbulb className=" animate-fadeIn" fontSize={20} />
                )}
            </span>
        </button>
    );
};

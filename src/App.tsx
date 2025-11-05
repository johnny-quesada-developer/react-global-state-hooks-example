import { CustomActionsContext, SimpleContext } from './react-context';
import { CustomActionsStore, SimpleStorage } from './react-global-state-hooks';
import { ThemeButton } from './components';
import merge from 'easy-css-merge';
import { theme } from './states';

const App = () => {
    const themeValue = theme.getState();

    return (
        <div
            className={merge('h-full pb-96 flex flex-col gap-6 animate-fadeIn', {
                'bg-gray-100': themeValue === 'light',
                'bg-gray-700': themeValue === 'dark',
            })}
        >
            <div className="relative flex flex-col lg:grid grid-cols-1 gap-4 items-center m-auto">
                <ThemeButton className="sticky lg:justify-self-end self-end top-10 right-3"></ThemeButton>

                <h2
                    className={merge('text-2xl font-bold text-center', {
                        'text-gray-700': themeValue === 'light',
                        'text-gray-200': themeValue === 'dark',
                    })}
                >
                    react-global-state-hooks
                </h2>

                <SimpleStorage />

                <CustomActionsStore />

                <h2
                    className={merge('text-2xl font-bold text-center my-10', {
                        'text-gray-700': themeValue === 'light',
                        'text-gray-200': themeValue === 'dark',
                    })}
                >
                    useContext
                </h2>

                <SimpleContext />

                <CustomActionsContext />
            </div>
        </div>
    );
};

export default App;

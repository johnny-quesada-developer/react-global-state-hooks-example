import { CustomActionsContext, SimpleContext } from './react-context';
import { CustomActionsStore, SimpleStorage } from './react-global-state-hooks';
import { ThemeButton } from './components';
import { useEffect } from 'react';
import { restoreTheme, themeGetter } from './states';

const App = () => {
  const theme = themeGetter();

  useEffect(() => {
    restoreTheme();
  }, []);

  return (
    <div
      className={[
        `h-full pb-96  pt-10 flex flex-col gap-6  animate-fadeIn `,
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-700',
      ].join(' ')}
    >
      <div className='relative flex flex-col lg:grid grid-cols-1 gap-4 items-center m-auto'>
        <ThemeButton className='sticky lg:justify-self-end self-end top-0 right-10'></ThemeButton>

        <h1
          className={[
            'text-3xl font-bold text-center ',
            theme === 'light' ? 'text-gray-700' : 'text-gray-200',
          ].join(' ')}
        >
          React Global State Hooks vs React Context
        </h1>

        <h2
          className={[
            'text-2xl font-bold text-center my-3',
            theme === 'light' ? 'text-gray-700' : 'text-gray-200',
          ].join(' ')}
        >
          react-global-state-hooks
        </h2>

        <SimpleStorage />

        <CustomActionsStore />

        <h2
          className={[
            'text-2xl font-bold text-center my-10',
            theme === 'light' ? 'text-gray-700' : 'text-gray-200',
          ].join(' ')}
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

// import { ReactGlobalStateHookExample } from './react-global-state-hooks';
import { CustomActionsContext, SimpleContext } from './react-context';
import { CustomActionsStore, SimpleStorage } from './react-global-state-hooks';

const App = () => {
  return (
    <div className='w-full h-full pb-96 bg-blue-50 pt-10 flex flex-col gap-6'>
      <h1 className='text-2xl font-bold text-center text-gray-700'>
        React Global State Hooks vs React Context
      </h1>

      <div className='flex flex-col lg:grid grid-cols-2 lg:px-20 gap-10 lg:items-baseline m-auto'>
        <SimpleContext />

        <SimpleStorage />

        <CustomActionsContext />

        <CustomActionsStore />
      </div>
    </div>
  );
};

export default App;

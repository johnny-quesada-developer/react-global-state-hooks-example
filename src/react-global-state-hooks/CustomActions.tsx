import React, { PropsWithChildren, useContext } from 'react';
import { StoreTools } from 'react-global-state-hooks/lib/GlobalStore.types';
import GlobalStore from 'react-native-global-state-hooks';

const useRenderCount = () => {
  const ref = React.useRef(0);
  const rendersCount = ref.current ?? 0;

  if (ref.current !== null) {
    ref.current += 1;
  }

  return { rendersCount };
};

const countStore = new GlobalStore(0, null, {
  increase() {
    return ({ setState }: StoreTools<number>) => {
      debugger;
      setState((state) => state + 1);
    };
  },
  decrease() {
    return ({ setState }: StoreTools<number>) => setState((state) => state - 1);
  },
} as const);

const useCount = countStore.getHook();
const [, countActions] = countStore.getHookDecoupled();

const App = () => {
  return (
    <div className='flex w-full h-full justify-center pt-36'>
      <div className='flex flex-row gap-2 items-center'>
        <div>
          <h1 className='font-bold'>react-global-state-hooks</h1>
          <DisplayComponent />
        </div>

        <div>
          <SetterComponent />
        </div>
      </div>
    </div>
  );
};

const DisplayComponent = () => {
  const [count] = useCount();
  const { rendersCount } = useRenderCount();

  return (
    <div className='bg-yellow-50'>
      <label className='block'>
        <strong>Count Value:</strong> {count}
      </label>

      <label className='block'>
        <strong>Display renders:</strong> {rendersCount}
      </label>
    </div>
  );
};

const SetterComponent = () => {
  const { rendersCount } = useRenderCount();

  return (
    <div className='bg-orange-50'>
      <label className='block text-center'>
        <strong>Setter render:</strong> {rendersCount}
      </label>

      <div className='flex flex-row gap-'>
        <button
          className='bg-green-50 border p-2'
          onClick={countActions.increase}
        >
          Increment
        </button>

        <button
          className='bg-blue-50 border p-2'
          onClick={countActions.decrease}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import GlobalStore from 'react-native-global-state-hooks';
import { useRenderCount, Container, StateDetails, Button } from '../fixtures';

const store = new GlobalStore(0);

const useCount = store.getHook();
const [getCount, setCountDecoupled] = store.getHookDecoupled();

const FirstComponent: React.FC = () => {
  const [count, setState] = useCount();
  const rendersCount = useRenderCount();

  return (
    <StateDetails count={count} color='bg-blue-50' renders={rendersCount}>
      <div className='flex-1 flex justify-end'>
        <Button onClick={() => setState((state) => state + 1)}>Increase</Button>
      </div>
    </StateDetails>
  );
};

const SecondComponent: React.FC = () => {
  const [count, setState] = useCount();
  const rendersCount = useRenderCount();

  return (
    <StateDetails count={count} color='bg-orange-50' renders={rendersCount}>
      <div className='flex-1 flex justify-end'>
        <Button onClick={() => setState((state) => state - 1)}>Decrease</Button>
      </div>
    </StateDetails>
  );
};

const ThirdComponentDecoupled: React.FC = () => {
  const count = getCount();
  const rendersCount = useRenderCount();

  return (
    <StateDetails
      label='Decoupled'
      count={count}
      color='bg-blue-50'
      renders={rendersCount}
    >
      <div className='flex-1 flex justify-end'>
        <Button onClick={() => setCountDecoupled((state) => state + 1)}>
          Increase
        </Button>
      </div>
    </StateDetails>
  );
};

const FourthComponent: React.FC = () => {
  const [count, setState] = useCount();
  const rendersCount = useRenderCount();

  return (
    <StateDetails
      label='Connected'
      count={count}
      color='bg-orange-50'
      renders={rendersCount}
    >
      <div className='flex-1 flex justify-end'>
        <Button onClick={() => setState((state) => state - 1)}>Decrease</Button>
      </div>
    </StateDetails>
  );
};

export const SimpleStorage: React.FC = () => {
  return (
    <Container title='Simple GlobalStore'>
      <div className='flex-1 grid grid-cols-2 gap-4'>
        <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
          <p className='text-sm text-gray-500'>
            Take a look on <strong>SimpleStore.tsx</strong> <br />
            <br />
            Here you can notice that dont need any longer to create a{' '}
            <span className='text-red-500'>context</span>, a{' '}
            <span className='text-red-500'>provider</span>, a{' '}
            <span className='text-red-500'>hook</span>, and later{' '}
            <span className='text-red-500'>wrappers</span>... We just need to
            create an <strong>GlobalStore</strong> get the hook and use it.
          </p>
          <code className='my-4'>
            <p>const store = new GlobalStore(0);</p>
            <br />
            <p>const useCount = store.getHook();</p>
          </code>
        </div>

        <FirstComponent />
        <SecondComponent />

        <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
          <h1 className='text-lg font-bold text-gray-700'>Decoupled Hooks</h1>
          <p className='text-sm text-gray-500'>
            You can also use the decoupled hooks, which are useful when you need
            to access the state from a function that is not a component... This
            is not a hook himselft but is conect to the store and it will
            trigger changes on the subscribers of the store.
          </p>
        </div>

        <ThirdComponentDecoupled />
        <FourthComponent />

        <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
          <p className='text-sm text-gray-500'>
            To get the decoupled hooks you can use:
          </p>
          <code className=' overflow-scroll '>
            <pre>{`const store = new GlobalStore(0);

const [, setCount] = store.getHookDecoupled();
            `}</pre>
          </code>
        </div>
      </div>
    </Container>
  );
};

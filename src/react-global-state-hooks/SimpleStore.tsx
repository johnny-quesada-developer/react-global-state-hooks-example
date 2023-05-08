import React from 'react';
import {
  createGlobalState,
  createGlobalStateWithDecoupledFuncs,
} from 'react-global-state-hooks';
import { useRenderCount, Container, StateDetails, Button } from '../fixtures';

const [useCount, getCount, setCountDecoupled] =
  createGlobalStateWithDecoupledFuncs(0);

const FirstComponent: React.FC = () => {
  const [count, setState] = useCount();
  const rendersCount = useRenderCount();

  return (
    <StateDetails
      label='Component 1'
      count={count}
      color='bg-blue-50'
      renders={rendersCount}
    >
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
    <StateDetails
      label='Component 2'
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

const ThirdComponentDecoupled: React.FC = () => {
  const count = getCount();
  const rendersCount = useRenderCount();

  return (
    <StateDetails
      label='Decoupled Component'
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

const useCount4 = createGlobalState(0, {
  localStorage: {
    key: 'count4',
    encrypt: true,
  },
});

const FourthComponent: React.FC = () => {
  const [count, setState] = useCount4();
  const rendersCount = useRenderCount();

  return (
    <StateDetails
      label='Local Storage Synced'
      count={count}
      color='bg-orange-50'
      renders={rendersCount}
    >
      <div className='flex-1 flex justify-end gap-3'>
        <Button onClick={() => setState((state) => state + 1)}>Increase</Button>
        <Button onClick={() => setState((state) => state - 1)}>Decrease</Button>
      </div>
    </StateDetails>
  );
};

export const SimpleStorage: React.FC = () => {
  return (
    <Container title='Simple global state'>
      <div className='flex-1 grid grid-cols-2 gap-4'>
        <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
          <p className='text-sm text-gray-500'>
            <strong>SimpleStore.tsx</strong>
            <br />
            <br />
            We are gonna create a global state hook <strong>
              useCount
            </strong>{' '}
            with one line of code.
          </p>

          <pre>
            <code className='language-javascript my-4'>
              <p>const useCount = createGlobalState(0)</p>
            </code>
          </pre>

          <p className='text-sm text-gray-500'>
            That's it! Welcome to global hooks.
          </p>

          <p className='text-sm text-gray-500'>
            Let's see how to use it inside a our component
          </p>
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

        <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
          <p className='text-sm text-gray-500'>
            To get the decoupled hooks you can use:
          </p>
          <pre>
            <code className='language-javascript overflow-scroll '>
              {`const [useCount, countGetter, countSetter] = createGlobalStateWithDecoupledFuncs(0);`}
            </code>
          </pre>
        </div>

        <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
          <p className='text-sm text-gray-500'>
            Finally, for store the state in the local storage you can use:
          </p>
          <pre>
            <code className='language-javascript overflow-scroll '>
              {`const useCount = createGlobalState(0, {
  localStorage: {
    key: 'count4',
  }
});`}
            </code>
          </pre>
        </div>

        <FourthComponent />
      </div>
    </Container>
  );
};

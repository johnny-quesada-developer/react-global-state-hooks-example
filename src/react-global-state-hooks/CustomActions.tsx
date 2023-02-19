import React from 'react';
import { GlobalStore } from 'react-global-state-hooks';
import { StoreTools } from 'react-native-global-state-hooks/lib';
import { useRenderCount, Container, StateDetails, Button } from '../fixtures';

const store = new GlobalStore(
  0,
  {
    localStorageKey: 'count1',
    encrypt: false,
  },
  {
    increase() {
      return ({ setState }: StoreTools<number>) => {
        setState((state) => state + 1);
      };
    },
    decrease() {
      return ({ setState }: StoreTools<number>) => {
        setState((state) => state - 1);
      };
    },
  } as const
);

const useCount = store.getHook();
const [, actions] = store.getHookDecoupled();

const FirstComponent: React.FC = () => {
  const rendersCount = useRenderCount();

  return (
    <StateDetails
      label='Decoupled'
      count={null}
      color='bg-blue-50'
      renders={rendersCount}
    >
      <div className='flex-1 flex justify-between'>
        <Button onClick={actions.increase}>Increase</Button>
        <Button onClick={actions.decrease}>Decrease</Button>
      </div>
    </StateDetails>
  );
};

const SecondComponent: React.FC = () => {
  const [count] = useCount();
  const rendersCount = useRenderCount();

  return (
    <StateDetails
      label='Connected'
      count={count}
      color='bg-orange-50'
      renders={rendersCount}
    ></StateDetails>
  );
};

export const CustomActionsStore: React.FC = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Container title='GlobalStore with custom actions'>
        <div className='flex-1 grid grid-cols-2 gap-4'>
          <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
            <p className='text-sm text-gray-500'>
              Creating an store with custom actions is so easy, just pass the
              custom configuration as the third argument of the constructor.
            </p>

            <code className='block overflow-scroll'>
              <pre className='block'>{`const store = new GlobalStore(0, {
  localStorageKey: 'count1',
  encrypt: false,
}, {

increase() {
  return ({ setState }: StoreTools<number>) => {
    setState((state) => state + 1);
  };
},

decrease() {
  return ({ setState }: StoreTools<number>) => {
    setState((state) => state - 1);
  };
},

} as const);
`}</pre>
            </code>
            <br />

            <label className='block border-b pb-3 col-span-2'>
              <strong>Then in the component:</strong>
            </label>

            <code>
              <pre>{`const [getCount, actions] = store.getHook();

// now instead of a simple setter function, 
// we get an object with all the custom 

actions.increase();
actions.decrease();`}</pre>
            </code>
            <br />
            <p className='text-justify text-sm text-gray-500'>
              The second argument of constructor is the configuration object,
              which can recibe the life cycle hooks, and some extra
              configuration like the <strong>localStorageKey</strong> and{' '}
              <strong>encrypt</strong> options which will make the state persist
              in the local storage whithout encrypting it.
              <br />
              you can see more about the configuration object in the{' '}
              <a
                className=' text-blue-500 hover:underline'
                href='https://www.npmjs.com/package/react-native-global-state-hooks'
              >
                package documentation
              </a>
            </p>
          </div>

          <FirstComponent />
          <SecondComponent />

          <div className='col-span-2  pt-2 flex flex-col gap-2'>
            <label className='block border-b pb-3 col-span-2 '>
              <strong>Decoupled hook:</strong>
            </label>

            <p className='text-justify text-sm text-gray-500 mb-3'>
              Check the file
              <strong>...src/react-global-state-hooks/CustomActions.tsx</strong>
              <br />
              <br />
              In this example you are able to nocite that finally we manage to
              separate the manipulation of the state from the subscription to
              the state.
              <br />
              <br />
              This feature allow us to create a more flexibiliy and reduce
              unnecesary re-renders, you just need to use{' '}
              <strong>getHookDecoupled</strong> instead of{' '}
              <strong>getHook</strong>
            </p>

            <code className='block overflow-scroll'>
              <pre>{`const [getCount, actions] = store.getHookDecoupled();

// decoupled actions linked to the store
actions.increase();
actions.decrease();

console.log(getCount());// 0`}</pre>
            </code>
          </div>
        </div>
      </Container>
    </div>
  );
};

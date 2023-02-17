import React from 'react';
import { GlobalStore } from 'react-global-state-hooks';
import { StoreTools } from 'react-native-global-state-hooks/lib';
import { useRenderCount, Container, StateDetails, Button } from '../fixtures';
import { Collapsible } from '../fixtures/Collapsible';

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
const [getCount, actions] = store.getHookDecoupled();

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
  const code = `const CountContext = createContext(0);

  const CountSetterContext = createContext({
    increase: null as () => void,
    decrease: null as () => void,
  });
  
  const useCount = () => {
    const count = useContext(CountContext);
  
    return count;
  };
  
  const useCountSetter = () => {
    const { increase, decrease } = useContext(CountSetterContext);
  
    return { increase, decrease };
  };
  
  const CountProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [count, setState] = useState(0);
  
    const increase = useCallback(() => setState((state) => state + 1), []);
    const decrease = useCallback(() => setState((state) => state - 1), []);
  
    return (
      <CountSetterContext.Provider value={{ increase, decrease }}>
        <CountContext.Provider value={count}>{children}</CountContext.Provider>
      </CountSetterContext.Provider>
    );
  };
  
  ....
  <CountProvider>
      <App />
  </CountProvider>
  };
  
  ...
  
  // In the component, to subscribe to the state
  const count = useCount();
  
  ...
  // To subscribe to the custom actions, in the component
  const { increase, decrease } = useCountSetter();
  `;

  return (
    <div className='flex flex-col gap-4'>
      <Container title='GlobalStore with custom actions' bottom={Legend}>
        <div className='flex-1 grid grid-cols-2 gap-4'>
          <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
            <p className='text-sm text-gray-500'>
              Creating an store with custom actions is so easy, just pass the
              custom configuration as the third argument of the constructor.
            </p>

            <Collapsible title='See Code'>
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

// everthing keeps working as before
const useCount = store.getHook();
const [getCount, actions] = store.getHookDecoupled();

// The mayor difference is that now 
// instead of a simple setter function, 
// we get an object with all the custom 
// actions that we defined

// example
actions.increase();
actions.decrease();
`}</pre>
              </code>
            </Collapsible>
          </div>

          <FirstComponent />
          <SecondComponent />

          <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
            <Collapsible title='See Code'>
              <code className='block overflow-scroll'>
                <pre className='block'>{code}</pre>
              </code>
            </Collapsible>
          </div>
        </div>
      </Container>
    </div>
  );
};

const Legend = (() => {
  const Component = () => {
    return (
      <div className=' w-full flex flex-col gap-4'>
        <p className='text-justify text-sm text-gray-500'>
          Check the file
          <strong>...src/react-global-state-hooks/CustomActions.tsx</strong>
          <br />
          <br />
          In this example you are able to nocite that finally we manage to
          separate the manipulation of the state from the subscription to the
          state.
          <br />
          <br />
          This feature allow us to create a more flexible and reduce unnecesary
          re-renders.
        </p>
      </div>
    );
  };

  return <Component />;
})();

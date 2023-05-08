import React, {
  PropsWithChildren,
  useContext,
  createContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useRenderCount, Container, StateDetails, Button } from '../fixtures';
import { Collapsible } from '../fixtures/Collapsible';

const CountContext = createContext(0);

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

  const actions = useMemo(() => {
    return { increase, decrease };
  }, [increase, decrease]);

  return (
    <CountSetterContext.Provider value={actions}>
      <CountContext.Provider value={count}>{children}</CountContext.Provider>
    </CountSetterContext.Provider>
  );
};

const FirstComponent: React.FC = () => {
  const { increase, decrease } = useCountSetter();
  const rendersCount = useRenderCount();

  return (
    <StateDetails
      label='Decoupled'
      count={null}
      color='bg-blue-50'
      renders={rendersCount}
    >
      <div className='flex-1 flex flex-wrap gap-3'>
        <Button onClick={increase}>Increase</Button>
        <Button onClick={decrease}>Decrease</Button>
      </div>
    </StateDetails>
  );
};

const SecondComponent: React.FC = () => {
  const count = useCount();
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

export const CustomActionsContext: React.FC = () => {
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

    // this is necessary in order to avoid re-creating the object
    const actions = useMemo(() => {
      return { increase, decrease };
    }, [increase, decrease]);
  
    return (
      <CountSetterContext.Provider value={actions}>
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
    <CountProvider>
      <div className='flex flex-col gap-4'>
        <Container title='Context with custom actions' bottom={Legend}>
          <div className='flex-1 grid grid-cols-2 gap-4'>
            <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
              <p className='text-sm text-gray-500'>
                You could have the necessity to create a context with custom for
                manipulating the state. Let see how we can do it with
                <strong className='text-red-500'> React Context.</strong>
              </p>
            </div>

            <FirstComponent />
            <SecondComponent />

            <div className='col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2'>
              <Collapsible title='See Code'>
                <pre>
                  <code className='block overflow-scroll language-javascript'>
                    {code}
                  </code>
                </pre>
              </Collapsible>
            </div>
          </div>
        </Container>
      </div>
    </CountProvider>
  );
};

const Legend = (() => {
  const Component = () => {
    return (
      <div className=' flex flex-col gap-4'>
        <p className='text-justify text-sm text-gray-500'>
          Check the file
          <strong>CustomActions.tsx</strong>
          <br />
          <br />
          In this example you are able to notice that separating the state from
          the actions it requires way more code which you can avoid by using{' '}
          <a
            className=' text-blue-500 hover:underline'
            href='https://www.npmjs.com/package/react-global-state-hooks'
          >
            rect-global-state-hooks
          </a>
        </p>
      </div>
    );
  };

  return <Component />;
})();

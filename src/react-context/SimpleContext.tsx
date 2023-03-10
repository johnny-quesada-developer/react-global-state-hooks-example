import React, {
  PropsWithChildren,
  useContext,
  Dispatch,
  createContext,
  SetStateAction,
  useState,
} from 'react';
import { useRenderCount, Container, StateDetails, Button } from '../fixtures';
import { Collapsible } from '../fixtures/Collapsible';

const CountContext = createContext({
  count: 0,
  setState: null as Dispatch<SetStateAction<number>>,
});

const useCount = () => {
  const { count, setState } = useContext(CountContext);

  return { count, setState };
};

const CountProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [count, setState] = useState(0);

  return (
    <CountContext.Provider
      value={{
        count,
        setState,
      }}
    >
      {children}
    </CountContext.Provider>
  );
};

const FirstComponent: React.FC = () => {
  const { count, setState } = useCount();
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
  const { count, setState } = useCount();
  const rendersCount = useRenderCount();

  return (
    <StateDetails count={count} color='bg-orange-50' renders={rendersCount}>
      <div className='flex-1 flex justify-end'>
        <Button onClick={() => setState((state) => state - 1)}>Decrease</Button>
      </div>
    </StateDetails>
  );
};

const Legend = (() => {
  const Component = () => {
    return (
      <div className='max-w-full flex flex-col gap-4'>
        <p className='text-justify text-sm text-gray-500'>
          Check the file
          <strong>...SimpleContext.tsx</strong>
          <br />
          <br />
          In this example you will notice how for creating a simple shareable
          peace of state we need to create a{' '}
          <strong className='text-red-500'>context</strong>, a{' '}
          <strong className='text-red-500'>provider</strong>, a{' '}
          <strong className='text-red-500'>hook</strong>, and later{' '}
          <strong className='text-red-500'>wrap</strong> the components that
          need to access the state.
        </p>

        <Collapsible title='See Code'>
          <code className='block overflow-scroll'>
            <pre className='block'>{`const CountContext = createContext({
  count: 0,
  setState: null as Dispatch<SetStateAction<number>>,
});

const useCount = () => {
  const { count, setState } = useContext(CountContext);

  return { count, setState };
};

const CountProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [count, setState] = useState(0);

  return (
    <CountContext.Provider
      value={{
        count,
        setState,
      }}
    >
      {children}
    </CountContext.Provider>
  );

....
<CountProvider>
    <App />
</CountProvider>
};`}</pre>
          </code>
        </Collapsible>
      </div>
    );
  };

  return <Component />;
})();

export const SimpleContext: React.FC = () => {
  return (
    <CountProvider>
      <div className='flex flex-col gap-4'>
        <Container title='Simple Context' bottom={Legend}>
          <FirstComponent />
          <SecondComponent />
        </Container>
      </div>
    </CountProvider>
  );
};

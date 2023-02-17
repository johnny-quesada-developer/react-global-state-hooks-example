import React, {
  PropsWithChildren,
  useContext,
  Dispatch,
  createContext,
  SetStateAction,
  useState,
} from 'react';

import { useRenderCount, Container, StateDetails, Button } from '../fixtures';

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
      <div className='flex flex-col gap-2'>
        <p className='text-justify text-sm text-gray-500'>
          In this example you are able to notice how for creating a simple
          shareable peace of state we need to create a context, a provider, a
          hook, and later wrap the components that need to access the state.
          <br />
          <br />
          <strong className='text-sm'>...CustomActions.tsx</strong>
        </p>
      </div>
    );
  };

  return <Component />;
})();

export const CustomActions: React.FC = () => {
  return (
    <CountProvider>
      <Container title='Sharing a simple context' bottom={Legend}>
        <FirstComponent />
        <SecondComponent />
      </Container>
    </CountProvider>
  );
};

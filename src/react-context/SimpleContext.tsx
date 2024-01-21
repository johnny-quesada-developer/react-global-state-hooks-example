import React, { PropsWithChildren, useContext, Dispatch, createContext, SetStateAction, useState } from 'react';
import { useRenderCount, Container, StateDetails, Button, CodeFragment, write } from '../fixtures';
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
        <StateDetails count={count} color="bg-blue-50" renders={rendersCount}>
            <div className="flex-1 flex">
                <Button onClick={() => setState((state) => state + 1)}>Increase</Button>
            </div>
        </StateDetails>
    );
};

const SecondComponent: React.FC = () => {
    const { count, setState } = useCount();
    const rendersCount = useRenderCount();

    return (
        <StateDetails count={count} color="bg-orange-50" renders={rendersCount}>
            <div className="flex-1 flex">
                <Button onClick={() => setState((state) => state - 1)}>Decrease</Button>
            </div>
        </StateDetails>
    );
};

const Legend = (() => {
    const Component = () => {
        return (
            <div className="flex flex-col gap-4">
                <p className="text-justify text-sm text-gray-500">
                    Check the file
                    <strong>...SimpleContext.tsx</strong>
                    <br />
                    <br />
                    In this example you will notice how for creating a simple shareable peace of state we need to create a{' '}
                    <strong className="text-red-500">context</strong>, a <strong className="text-red-500">provider</strong>, a{' '}
                    <strong className="text-red-500">hook</strong>, and later <strong className="text-red-500">wrap</strong> the components
                    that need to access the state.
                </p>

                <Collapsible title="See Code">
                    <CodeFragment>
                        {write("//let's create a context for the state")
                            .newLine(0, 'const CountContext = createContext({')
                            .newLine(2, 'count: 0,')
                            .newLine(2, 'setState: null as Dispatch<SetStateAction<number>>')
                            .newLine(0, '});')
                            .newLine(0, '')
                            .newLine(0, "// let's create a custom hook for subscribing to the state context")
                            .newLine(0, 'const useCount = () => {')
                            .newLine(2, 'const { count, setState } = useContext(CountContext);')
                            .newLine(2, 'return { count, setState };')
                            .newLine(0, '};')
                            .newLine(0, '')
                            .newLine(0, "// let's create a provider for the state context")
                            .newLine(0, 'const CountProvider: React.FC<PropsWithChildren> = ({ children }) => {')
                            .newLine(2, 'const [count, setState] = useState(0);')
                            .newLine(0, '')
                            .newLine(2, 'return (')
                            .newLine(4, '<CountContext.Provider value={{ count, setState }}>')
                            .newLine(6, '{children}')
                            .newLine(4, '</CountContext.Provider>')
                            .newLine(2, ');')
                            .newLine(0, '};')
                            .newLine(0, '')
                            .newLine(0, "// let's wrap the components that need to access the state..")
                            .newLine(0, "// otherwise they won't be able to access the state")
                            .newLine(0, '....')
                            .newLine(0, '<CountProvider>')
                            .newLine(2, '<App />')
                            .newLine(0, '</CountProvider>')
                            .newLine(0, '};')
                            .concat()}
                    </CodeFragment>
                </Collapsible>
            </div>
        );
    };

    return <Component />;
})();

export const SimpleContext: React.FC = () => {
    return (
        <CountProvider>
            <div className="flex flex-col gap-4">
                <Container title="Simple Context" bottom={Legend}>
                    <FirstComponent />
                    <SecondComponent />
                </Container>
            </div>
        </CountProvider>
    );
};

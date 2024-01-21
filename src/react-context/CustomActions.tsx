import React, { PropsWithChildren, useContext, createContext, useState, useCallback, useMemo } from 'react';
import { useRenderCount, Container, StateDetails, Button, write, CodeFragment } from '../fixtures';
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
        <StateDetails label="Decoupled" count={null} color="bg-blue-50" renders={rendersCount}>
            <div className="flex-1 flex flex-wrap gap-3">
                <Button onClick={increase}>Increase</Button>
                <Button onClick={decrease}>Decrease</Button>
            </div>
        </StateDetails>
    );
};

const SecondComponent: React.FC = () => {
    const count = useCount();
    const rendersCount = useRenderCount();

    return <StateDetails label="Connected" count={count} color="bg-orange-50" renders={rendersCount}></StateDetails>;
};

export const CustomActionsContext: React.FC = () => {
    return (
        <CountProvider>
            <div className="flex flex-col gap-4">
                <Container title="Context with custom actions" bottom={Legend}>
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2">
                            <p className="text-sm text-gray-500">
                                You could have the necessity to create a context with custom for manipulating the state. Let see how we can
                                do it with
                                <strong className="text-red-500"> React Context.</strong>
                            </p>
                        </div>

                        <FirstComponent />
                        <SecondComponent />

                        <div className="col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2">
                            <Collapsible title="See Code">
                                <CodeFragment>
                                    {write('const CountContext = createContext(0);')
                                        .newLine(0, '')
                                        .newLine(0, 'const CountSetterContext = createContext({')
                                        .newLine(2, 'increase: null as () => void,')
                                        .newLine(2, 'decrease: null as () => void,')
                                        .newLine(0, '});')
                                        .newLine(0, '')
                                        .newLine(0, 'const useCount = () => {')
                                        .newLine(2, 'const count = useContext(CountContext);')
                                        .newLine(2, 'return count;')
                                        .newLine(0, '};')
                                        .newLine(0, '')
                                        .newLine(0, 'const useCountSetter = () => {')
                                        .newLine(2, 'const { increase, decrease } = useContext(CountSetterContext);')
                                        .newLine(2, 'return { increase, decrease };')
                                        .newLine(0, '};')
                                        .newLine(0, '')
                                        .newLine(0, 'const CountProvider: React.FC<PropsWithChildren> = ({ children }) => {')
                                        .newLine(2, 'const [count, setState] = useState(0);')
                                        .newLine(2, 'const increase = useCallback(() => setState((state) => state + 1), []);')
                                        .newLine(2, 'const decrease = useCallback(() => setState((state) => state - 1), []);')
                                        .newLine(0, '')
                                        .newLine(2, '// this is necessary in order to avoid re-creating the object')
                                        .newLine(2, 'const actions = useMemo(() => {')
                                        .newLine(4, 'return { increase, decrease };')
                                        .newLine(2, '}, [increase, decrease]);')
                                        .newLine(0, '')
                                        .newLine(2, 'return (')
                                        .newLine(4, '<CountSetterContext.Provider value={actions}>')
                                        .newLine(6, '<CountContext.Provider value={count}>{children}</CountContext.Provider>')
                                        .newLine(4, '</CountSetterContext.Provider>')
                                        .newLine(2, ');')
                                        .newLine(0, '};')
                                        .newLine(0, '')
                                        .newLine(0, '....')
                                        .newLine(0, '<CountProvider>')
                                        .newLine(2, '<App />')
                                        .newLine(0, '</CountProvider>')
                                        .newLine(0, '};')
                                        .newLine(0, '')
                                        .newLine(0, '...')
                                        .newLine(0, '')
                                        .newLine(0, '// In the component, to subscribe to the state')
                                        .newLine(0, 'const count = useCount();')
                                        .newLine(0, '')
                                        .newLine(0, '...')
                                        .newLine(0, '// To subscribe to the custom actions, in the component')
                                        .newLine(0, 'const { increase, decrease } = useCountSetter();')
                                        .concat()}
                                </CodeFragment>
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
            <div className=" flex flex-col gap-4">
                <p className="text-justify text-sm text-gray-500">
                    Check the file
                    <strong>CustomActions.tsx</strong>
                    <br />
                    <br />
                    In this example you are able to notice that separating the state from the actions it requires way more code which you
                    can avoid by using{' '}
                    <a className=" text-blue-500 hover:underline" href="https://www.npmjs.com/package/react-global-state-hooks">
                        rect-global-state-hooks
                    </a>
                </p>
            </div>
        );
    };

    return <Component />;
})();

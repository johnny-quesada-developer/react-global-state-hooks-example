import React from 'react';
import createGlobalState from 'react-global-state-hooks/createGlobalState';
import { useRenderCount, Container, StateDetails, Button } from '../fixtures';
import { CodeFragment, write } from '../fixtures';

const counter = createGlobalState(0, {
    name: 'useCount',
});

const FirstComponent: React.FC = () => {
    const [count, setState] = counter.use();
    const rendersCount = useRenderCount();

    return (
        <StateDetails label="Component 1" count={count} color="bg-blue-50" renders={rendersCount}>
            <div className="flex-1 flex">
                <Button onClick={() => setState((state) => state + 1)}>Increase</Button>
            </div>
        </StateDetails>
    );
};

const SecondComponent: React.FC = () => {
    const [count, setState] = counter.use();
    const rendersCount = useRenderCount();

    return (
        <StateDetails label="Component 2" count={count} color="bg-orange-50" renders={rendersCount}>
            <div className="flex-1 flex">
                <Button onClick={() => setState((state) => state - 1)}>Decrease</Button>
            </div>
        </StateDetails>
    );
};

const ThirdComponentDecoupled: React.FC = () => {
    const rendersCount = useRenderCount();

    return (
        <StateDetails label="Decoupled Component" count={counter.getState()} color="bg-blue-50" renders={rendersCount}>
            <div className="flex-1 flex">
                <Button onClick={() => counter.setState((state) => state + 1)}>Increase</Button>
            </div>
        </StateDetails>
    );
};

const useCount4 = createGlobalState(0, {
    name: 'useCount4',
    localStorage: {
        key: 'count4',
        validator: ({ restored }) => {
            if (typeof restored !== 'number' || isNaN(restored)) {
                throw new Error('Invalid number stored in localStorage');
            }
        },
    },
});

const FourthComponent: React.FC = () => {
    const [count, setState] = useCount4();
    const rendersCount = useRenderCount();

    return (
        <StateDetails label="Local Storage Synced" count={count} color="bg-orange-50" renders={rendersCount}>
            <div className="flex-1 flex gap-3 flex-wrap">
                <Button onClick={() => setState((state) => state + 1)}>Increase</Button>
                <Button onClick={() => setState((state) => state - 1)}>Decrease</Button>
            </div>
        </StateDetails>
    );
};

export const SimpleStorage: React.FC = () => {
    return (
        <Container title="Simple global state">
            <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2">
                    <p className="text-sm text-gray-500">
                        We are gonna create a global state hook <strong>useCount</strong> with one line of code.
                    </p>

                    <CodeFragment>
                        {write('const useCount = createGlobalState(0);')
                            .newLine(0, '')
                            .newLine(0, '// To use it inside a component')
                            .newLine(0, 'const MyComponent = () => {')
                            .newLine(4, 'const [count, setCount] = useCount();')
                            .newLine(0, '')
                            .newLine(4, 'return (')
                            .newLine(8, '<button onClick={() => setCount(count + 1)}>Increase</button>')
                            .newLine(4, ');')
                            .newLine(0, '}')
                            .concat()}
                    </CodeFragment>

                    <p className="text-sm text-gray-500">That's it! Welcome to global hooks.</p>

                    <p className="text-sm text-gray-500">Let's see how to use it inside a our component</p>
                </div>

                <FirstComponent />

                <SecondComponent />

                <div className="col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2">
                    <h1 className="text-lg font-bold text-gray-700">Decoupled Hooks</h1>
                    <p className="text-sm text-gray-500">
                        You can also use the decoupled hooks, which are useful when you need to access the state from a function that is not
                        a component... This is not a hook himselft but is conect to the store and it will trigger changes on the subscribers
                        of the store.
                    </p>
                </div>

                <ThirdComponentDecoupled />

                <div className="col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2">
                    <p className="text-sm text-gray-500">To get the decoupled hooks you can use something like this:</p>
                    <CodeFragment>
                        {write("const theme = createGlobalState<'light' | 'dark'>('light');")
                            .newLine(0, '')
                            .newLine(0, 'const App: React.FC = () => {')
                            .newLine(4, 'const [theme] = theme.use();')
                            .newLine(0, '')
                            .newLine(4, 'return <div data-theme={theme}>your app here</div>;')
                            .newLine(0, '};')
                            .newLine(0, '')
                            .newLine(0, 'const ToggleThemeButton: React.FC = () => {')
                            .newLine(4, 'return (')
                            .newLine(8, "<button onClick={() => theme.actions.setTheme(theme => theme === 'light' ? 'dark' : 'light')}>")
                            .newLine(10, 'Toggle Theme')
                            .newLine(8, '</button>')
                            .newLine(4, ');')
                            .newLine(0, '};')
                            .concat()}
                    </CodeFragment>
                    <p className="text-sm text-gray-500">
                        As you see, the toggle button not necessarily needs to listen the state changes, so we can use the decoupled hook
                    </p>
                </div>

                <div className="col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2">
                    <p className="text-sm text-gray-500">Finally, for store the state in the local storage you can use:</p>
                    <CodeFragment>
                        {write("const useTheme = createGlobalState<'light' | 'dark'>('light', {")
                            .newLine(8, 'localStorage: {')
                            .newLine(12, "key: 'theme', // that is all to sync with local storage")
                            .newLine(8, '},')
                            .newLine(4, '});')
                            .concat()}
                    </CodeFragment>
                </div>

                <FourthComponent />
            </div>
        </Container>
    );
};

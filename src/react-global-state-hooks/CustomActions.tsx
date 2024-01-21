import React from 'react';
import { createGlobalStateWithDecoupledFuncs, StoreTools } from 'react-global-state-hooks';
import { useRenderCount, Container, StateDetails, Button, CodeFragment, write } from '../fixtures';

const [useCount, , actions] = createGlobalStateWithDecoupledFuncs(0, {
    localStorage: {
        key: 'count',
        encrypt: true,
    },
    actions: {
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
    } as const,
});

const FirstComponent: React.FC = () => {
    const rendersCount = useRenderCount();

    return (
        <StateDetails label="Decoupled" count={null} color="bg-blue-50" renders={rendersCount}>
            <div className="flex-1 flex flex-wrap gap-3">
                <Button onClick={actions.increase}>Increase</Button>
                <Button onClick={actions.decrease}>Decrease</Button>
            </div>
        </StateDetails>
    );
};

const SecondComponent: React.FC = () => {
    const [count] = useCount();
    const rendersCount = useRenderCount();

    return <StateDetails label="Connected" count={count} color="bg-orange-50" renders={rendersCount}></StateDetails>;
};

export const CustomActionsStore: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <Container title="GlobalStore with custom actions">
                <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="col-span-2 border-t border-t-dashed pt-2 flex flex-col gap-2">
                        <p className="text-sm text-gray-500">
                            Creating an store with custom actions is so easy, add the actions object to the configuration object, now the
                            mutations of the state will only be possible through the actions.
                        </p>

                        <CodeFragment>
                            {write('const useCount = createGlobalState(0, {')
                                .newLine(4, 'actions: {')
                                .newLine(8, 'increase() {')
                                .newLine(12, 'return ({ setState }: StoreTools<number>) => {')
                                .newLine(16, 'setState((state) => state + 1);')
                                .newLine(12, '};')
                                .newLine(8, '},')
                                .newLine()
                                .newLine(8, 'decrease() {')
                                .newLine(12, 'return ({ setState }: StoreTools<number>) => {')
                                .newLine(16, 'setState((state) => state - 1);')
                                .newLine(12, '};')
                                .newLine(8, '},')
                                .newLine(4, '} as const,')
                                .newLine(0, '});')
                                .concat()}
                        </CodeFragment>

                        <br />

                        <label className="block border-b pb-3 col-span-2">
                            <strong>Let's see how your component will look:</strong>
                        </label>

                        <CodeFragment>
                            {write('const [count, actions] = useCount();')
                                .newLine(0, '')
                                .newLine(0, '// now instead of a simple setter function, we get an object with all the custom actions')
                                .newLine(0, '')
                                .newLine(0, 'actions.increase();')
                                .newLine(0, 'actions.decrease();')
                                .concat()}
                        </CodeFragment>

                        <br />
                        <p className="text-justify text-sm text-gray-500">
                            The second argument of constructor is the configuration object, which can receive the life cycle methods hooks,
                            and some extra configuration like the <strong>localStorageKey</strong> and <strong>encrypt</strong> options
                            which will make the state persist in the local storage.
                            <br />
                            you can see more about the configuration object in the documentations:{' '}
                            <a className=" text-blue-500 hover:underline" href="https://www.npmjs.com/package/react-global-state-hooks">
                                rect-global-state-hooks
                            </a>{' '}
                            for web, or{' '}
                            <a
                                className="text-blue-500 hover:underline"
                                href="https://www.npmjs.com/package/react-native-global-state-hooks"
                            >
                                rect-native-global-state-hooks
                            </a>{' '}
                            for mobile
                        </p>
                    </div>

                    <FirstComponent />
                    <SecondComponent />
                </div>
            </Container>
        </div>
    );
};

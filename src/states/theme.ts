import prismjs from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import { createGlobalStateWithDecoupledFuncs, StoreTools } from 'react-global-state-hooks';

export type Theme = 'light' | 'dark';

const loadTheme = (value: string) => {
    const source = loadTheme as unknown as {
        promise: Promise<void>;
        isLoaded: boolean;
    };

    if (source.isLoaded) return Promise.resolve();
    if (source.promise) return source.promise;

    const prismjsTheme = (
        {
            light: 'prism',
            dark: 'prism-tomorrow',
        } as const
    )[value];

    source.promise = new Promise(async (resolve) => {
        // @ts-ignore
        await (prismjsTheme === 'prism' ? import('prismjs/themes/prism.css') : import('prismjs/themes/prism-tomorrow.css'));

        source.isLoaded = true;
        resolve();
    });

    return source.promise;
};

export const [useTheme, themeGetter, theme] = createGlobalStateWithDecoupledFuncs('dark' as Theme, {
    localStorage: {
        key: 'theme',
    },
    actions: {
        loadTheme: () => {
            return async ({ getState }: StoreTools<Theme>) => {
                await loadTheme(getState());
            };
        },
        highlight: () => {
            return async () => {
                await theme.loadTheme();

                prismjs.highlightAll();
            };
        },
        highlightElement: (element: HTMLElement) => {
            return async () => {
                await theme.loadTheme();

                prismjs.highlightElement(element, false);
            };
        },
        toggle() {
            return ({ setState }: StoreTools<Theme>) => {
                setState((state) => (state === 'light' ? 'dark' : 'light'));

                globalThis.location.reload();
            };
        },
    } as const,
    onInit: (async ({ getState }) => {
        const value = getState();

        document.documentElement.classList.add(value);

        await loadTheme(value);
    }) as null,
});

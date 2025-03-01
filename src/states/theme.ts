import prismjs from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import { createGlobalState } from 'react-global-state-hooks/createGlobalState';

export type Theme = 'light' | 'dark';

const loadTheme = (value: string) => {
    const source = loadTheme as unknown as {
        promise: Promise<void>;
        isLoaded: boolean;
    };

    if (source.isLoaded) return Promise.resolve();
    if (source.promise) return source.promise;

    const prismjsTheme = {
        light: 'prism',
        dark: 'prism-tomorrow',
    }[value];

    source.promise = new Promise(async (resolve) => {
        // @ts-ignore
        await (prismjsTheme === 'prism' ? import('prismjs/themes/prism.css') : import('prismjs/themes/prism-tomorrow.css'));

        source.isLoaded = true;
        resolve();
    });

    return source.promise;
};

export const useTheme = createGlobalState('dark' as Theme, {
    localStorage: {
        key: 'theme',
    },
    actions: {
        loadTheme: () => {
            return async ({ getState }) => {
                await loadTheme(getState());
            };
        },
        highlight: () => {
            return async () => {
                const [, theme] = useTheme.stateControls();

                await theme.loadTheme();

                prismjs.highlightAll();
            };
        },
        highlightElement: (element: HTMLElement) => {
            return async () => {
                const [, theme] = useTheme.stateControls();

                await theme.loadTheme();

                prismjs.highlightElement(element, false);
            };
        },
        toggle() {
            return ({ setState }) => {
                setState((state) => (state === 'light' ? 'dark' : 'light'));

                globalThis.location.reload();
            };
        },
    },
    callbacks: {
        onInit: async ({ getState }) => {
            const value = getState();

            document.documentElement.classList.add(value);

            await loadTheme(value);
        },
    },
});

export const [themeGetter, theme] = useTheme.stateControls();

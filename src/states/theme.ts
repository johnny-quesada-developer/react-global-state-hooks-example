import Prism from 'prismjs';

import {
  createGlobalStateWithDecoupledFuncs,
  StoreTools,
} from 'react-global-state-hooks';

export type Theme = 'light' | 'dark';

export const [useTheme, themeGetter, themeActions] =
  createGlobalStateWithDecoupledFuncs('dark' as Theme, {
    localStorage: {
      key: 'theme',
    },
    actions: {
      toggle() {
        return ({ setState }: StoreTools<Theme>) => {
          setState((state) => (state === 'light' ? 'dark' : 'light'));

          globalThis.location.reload();
        };
      },
    } as const,
  });

export const restoreTheme = () => {
  const theme = themeGetter();

  const prismjsTheme = {
    light: 'prism',
    dark: 'prism-tomorrow',
  }[theme];

  Prism.theme = prismjsTheme;
  Prism.highlightAll();

  if (theme === 'light') {
    // Load the "prism" theme
    // @ts-ignore
    import('prismjs/themes/prism.css').then(() => {
      Prism.highlightAll();
    });
  } else {
    // Load the "prism-tomorrow" theme
    // @ts-ignore
    import('prismjs/themes/prism-tomorrow.css').then(() => {
      Prism.highlightAll();
    });
  }
};

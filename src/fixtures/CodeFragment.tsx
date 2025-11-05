import React, { HtmlHTMLAttributes, PropsWithChildren, useEffect, useImperativeHandle, useRef } from 'react';
import merge, { MergeFilter } from 'easy-css-merge';
import { theme } from '../states';

export type CodeFragmentApi = {};

export type CodeFragmentRef = [HTMLPreElement, CodeFragmentApi];

export type CodeFragmentProps = PropsWithChildren<HtmlHTMLAttributes<HTMLPreElement>> & {
    /**
     * This parameter allows you to filter the default set of classes, so you can override
     */
    classNameFilter?: MergeFilter;
    language?: 'javascript' | 'typescript' | 'tsx' | 'jsx';
};

type NewLineFun = {
    (indentation: number, newLine?: string): ReturnType<typeof write>;
    (newLine?: string): ReturnType<typeof write>;
};

export const write = (
    code: string
): {
    newLine: NewLineFun;
    concat: () => string;
} => {
    let content = code;

    let newLine = (...arg: unknown[]) => {
        const indentation = typeof arg[0] === 'number' ? arg[0] : 0;
        const newLine = typeof arg[0] === 'string' ? arg[0] : arg[1];
        const indent = ' '.repeat(indentation);

        content = `${content}\n${indent}${newLine || ''}`;

        return write(content);
    };

    return {
        newLine: newLine as NewLineFun,
        concat: () => content,
    };
};

export const CodeFragment = React.forwardRef<CodeFragmentRef, CodeFragmentProps>(
    ({ className, classNameFilter, children, language = 'tsx', ...props }, ref) => {
        const containerRef = useRef<HTMLPreElement>(null);

        useImperativeHandle(
            ref,
            () => {
                // add your public api here
                const api: CodeFragmentApi = {};

                return [containerRef.current, api] as CodeFragmentRef;
            },
            []
        );

        useEffect(() => {
            if (!containerRef.current) return;

            theme.actions.highlightElement(containerRef.current.firstChild as HTMLElement);
        }, [children]);

        return (
            <pre ref={containerRef} className={merge(['block visible', classNameFilter], className)} {...props}>
                <code className={merge('my-4', `language-${language}`)}>{children}</code>
            </pre>
        );
    }
);

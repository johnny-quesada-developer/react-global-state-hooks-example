type Excludes = string;

type MergePredicate = (value: string, index: number, array: string[]) => unknown;

export type MergeFilter = () => MergePredicate | Excludes[];

export type MergeArg = string | Record<string, boolean> | (Record<string, boolean> | string)[];

export const merge = (...args: [...(MergeArg | [...MergeArg[], MergeFilter])[], MergeFilter | MergeArg]) => {
    const getClassFromSource = (source: MergeArg): string => {
        if (!source) return '';
        if (typeof source === 'string') return source.trimEnd();

        const isArray = Array.isArray(source);

        if (!isArray)
            return Object.entries(source).reduce((accumulator, [key, value]) => {
                if (!value) return accumulator;

                return `${accumulator} ${key.trimEnd()}`;
            }, '');

        const hasMainFilter = typeof args[args.length - 1] === 'function';
        const mainFilter = ((hasMainFilter ? args.pop() : null) as MergeFilter)?.();

        const mainContent = source.map((value) => {
            if (!value) return '';

            if (!Array.isArray(value)) return getClassFromSource(value as MergeArg);

            const hasFilter = typeof value[value.length - 1] === 'function';

            if (!hasFilter) return value.map(getClassFromSource);

            let filterSource = (value.pop() as MergeFilter)?.();
            const content = value.map(getClassFromSource);

            const isSimpleExclusion = Array.isArray(filterSource);
            const filter = (
                isSimpleExclusion ? (value: string) => !(filterSource as string[]).includes(value) : filterSource
            ) as MergePredicate;

            return content.filter(filter).join(' ');
        });

        if (!hasMainFilter) return mainContent.join(' ');

        const isSimpleExclusion = Array.isArray(mainFilter);
        const filter = (isSimpleExclusion ? (value: string) => !(mainFilter as string[]).includes(value) : mainFilter) as MergePredicate;

        return mainContent.filter(filter).join(' ');
    };

    return args.map(getClassFromSource).join(' ');
};

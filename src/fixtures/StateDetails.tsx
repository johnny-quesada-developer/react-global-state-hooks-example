import { PropsWithChildren } from 'react';
import { merge } from './util';

export type StateDetailsProps = PropsWithChildren<{
    label?: string;
    count?: number;
    renders: number;
    color?: string;
}>;

export const StateDetails: React.FC<PropsWithChildren<StateDetailsProps>> = ({ label, color, count, renders, children }) => {
    return (
        <div className={merge('flex-1 grid grid-cols-2 gap-2 p-4 border-dashed border-2 rounded-lg', color)}>
            {label && (
                <label className="block border-b pb-3 col-span-2 text-gray-500">
                    <strong>{label}:</strong>
                </label>
            )}

            <label className="block">
                <strong>Value:</strong>
            </label>

            <label className="text-right">{count ?? '_'}</label>

            <label className="block">
                <strong>Renders:</strong>
            </label>

            <label className="text-right">{renders}</label>

            <div className="col-span-2 border-t flex pt-3">{children}</div>
        </div>
    );
};

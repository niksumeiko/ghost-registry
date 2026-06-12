import { PropsWithChildren } from 'react';

export function FormError({ children }: PropsWithChildren) {
    return (
        <div
            role="alert"
            className="bg-red-200 px-4 py-3 flex items-center gap-2 my-3 text-sm"
        >
            <span aria-hidden>✘</span>
            {children}
        </div>
    );
}

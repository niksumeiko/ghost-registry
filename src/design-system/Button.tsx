import { PropsWithChildren, ButtonHTMLAttributes } from 'react';


type ButtonProps = PropsWithChildren<
    ButtonHTMLAttributes<HTMLButtonElement> & { testId?: string }
>;
export function SecondaryButton({
    children,
    className = '',
    testId,
    ...props
}: ButtonProps) {
    return (
        <button
            data-testid={testId}
            className={`w-fit border border-gray-300 rounded-md px-4 py-2 text-center ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export function PrimaryButton({
    children,
    className = '',
    testId,
    ...props
}: ButtonProps) {
    return (
        <button
            data-testid={testId}
            className={`w-fit border border-blue-300 bg-blue-100 rounded-md px-4 py-2 text-center ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

export const ButtonGroup = ({ children }: PropsWithChildren) => {
    return <div className="py-3">{children}</div>;
};

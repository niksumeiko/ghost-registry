import {
    type PropsWithChildren,
    useId,
    isValidElement,
    cloneElement,
} from 'react';

export function FormField({
    label,
    children,
    testId,
}: PropsWithChildren<{ label: string, testId?: string }>) {
    const id = useId();

    const enhanced =
        (isValidElement(children) && children.type === 'input') ||
        (isValidElement(children) && typeof children.type === 'function')
            ? cloneElement(children as React.ReactElement<{ id?: string }>, {
                  id,
              })
            : children;

    return (
        <div data-testId={testId} className="flex flex-col gap-1 mb-3">
            <label htmlFor={id} className="text-sm font-medium text-gray-600">
                {label}
            </label>
            {enhanced}
        </div>
    );
}

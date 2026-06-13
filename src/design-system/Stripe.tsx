import { type PropsWithChildren, Children } from 'react';
import cx from 'classnames';

export function Stripe({
    children,
    variant = 'primary',
}: PropsWithChildren<{ variant?: 'primary' | 'secondary' }>) {
    const count = Children.count(children);

    return (
        <div
            data-testid="stripe"
            className={cx('p-2.5 flex items-center', {
                'bg-violet-400': variant === 'primary',
                'bg-violet-300 px-10': variant === 'secondary',
                'justify-center': count === 1,
                'justify-between': count !== 1,
            })}
        >
            {children}
        </div>
    );
}

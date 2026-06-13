import {FC} from 'react';

export const BackButton: FC = () => (
    <a
        href="/"
        className="text-sm hover:underline hover:decoration-dotted"
    >
        ← Back
    </a>
);
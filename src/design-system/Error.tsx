import { FC } from 'react';
import { Layout } from './PageLayout.tsx';
import { Stripe } from './Stripe.tsx';
import { Logo } from './Logo.tsx';

export const Error: FC = () => (
    <Layout>
        <Stripe>
            <Logo variant="xl" />
        </Stripe>
        Error...
    </Layout>
);
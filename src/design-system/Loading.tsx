import { FC } from 'react';
import { Layout } from './PageLayout.tsx';
import { Stripe } from './Stripe.tsx';
import { Logo } from './Logo.tsx';

export const Loading: FC = () => (
    <Layout>
        <Stripe>
            <Logo variant="xl" />
        </Stripe>
        Loading...
    </Layout>
);
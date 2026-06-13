import {FC} from 'react';
import {ContentLayout, HeadingTitle, Layout, Logo, Paragraph, Stripe,} from '@design-system';
import {BackButton} from "../design-system/BackButton.tsx";

export const EditGhostNotFound: FC = () =>
    (
        <Layout>
            <Stripe variant="secondary">
                <BackButton/>
                <Logo variant="sm"/>
            </Stripe>
            <ContentLayout>
                <HeadingTitle level={1}>404</HeadingTitle>
                <Paragraph>Ghost not found.</Paragraph>
            </ContentLayout>
        </Layout>
    );
import {FC} from 'react';
import {ContentLayout, HeadingTitle, Layout, Logo, Paragraph, Stripe} from '@design-system';
import {BackButton} from "../design-system/BackButton.tsx";

export const EditGhostDenied: FC = () =>
    (
        <Layout testId="edit-ghost-denied-page">
            <Stripe variant="secondary">
                <BackButton/>
                <Logo variant="sm"/>
            </Stripe>
            <ContentLayout>
                <HeadingTitle level={1}>Access denied</HeadingTitle>
                <Paragraph>
                    This ghost's record is readonly. Editing is not permitted.
                </Paragraph>
            </ContentLayout>
        </Layout>
    )
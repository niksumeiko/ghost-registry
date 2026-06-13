import { FC } from 'react';
import {
    ContentLayout,
    HeadingTitle,
    Layout,
    Logo,
    Stripe,
} from '@design-system';
import { Navigate, useParams } from 'react-router-dom';
import { useSingleGhost } from './useSingleGhost.ts';
import { Loading } from '../design-system/Loading.tsx';
import { Error } from '../design-system/Error.tsx';
import { EditGhostForm } from './EditGhostForm.tsx';
import { BackButton } from '../design-system/BackButton.tsx';
import { isEditable } from '../flagService.ts';

export const EditGhostPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { isLoading, error, ghost } = useSingleGhost(id);

    if (isLoading) {
        return <Loading />;
    }

    if (error && error.message !== 'Failed to fetch target') {
        return <Error />;
    }

    if (!ghost) {
        return <Navigate to="/ghost-not-found" replace />;
    }

    if (!isEditable(ghost.flags)) {
        return <Navigate to="/ghost-not-editable" replace />;
    }

    return (
        <Layout>
            <Stripe variant="secondary">
                <BackButton />
                <HeadingTitle level={5}>Editing ghost</HeadingTitle>
                <Logo variant="sm" />
            </Stripe>
            <ContentLayout>
                <EditGhostForm ghost={ghost} />
            </ContentLayout>
        </Layout>
    );
};
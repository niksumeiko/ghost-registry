import type { RouteObject } from 'react-router-dom';
import { NavigationPage } from './navigator/useCases/navigate/NavigationPage.tsx';
import { Layout } from '@design-system';
import { TargetPage } from './target/useCases/viewTarget/TargetPage.tsx';
import { EditGhostPage } from './target/useCases/editTarget/EditGhostPage.tsx';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <NavigationPage />,
    },
    {
        path: '/next-target',
        element: <TargetPage />,
    },
    {
        path: '/ghost/:id/edit',
        element: <EditGhostPage />,
    },
    {
        path: '/restricted',
        element: (
            <Layout>
                <p className="px-10 text-2xl">
                    This area, along with other 100+ features within this app,
                    are restricted for your access.
                </p>
            </Layout>
        ),
    },
];

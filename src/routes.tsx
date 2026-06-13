import type {RouteObject} from 'react-router-dom';
import {NavigationPage} from './Navigation/NavigationPage.tsx';
import {Layout} from '@design-system';
import {NextTargetGhost} from './NextTargetGhost/NextTargetGhost.tsx';
import {EditGhostPage} from './EditGhost/EditGhostPage.tsx';
import {EditGhostNotFound} from './EditGhostNotFound/EditGhostNotFound.tsx';
import {EditGhostDenied} from './EditGhostDenied/EditGhostDenied.tsx';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <NavigationPage />,
    },
    {
        path: '/next-target',
        element: <NextTargetGhost />,
    },
    {
        path: '/ghost/:id/edit',
        element: <EditGhostPage />,
    },
    {
        path: '/ghost-not-found',
        element: <EditGhostNotFound />,
    },
    {
        path: '/ghost-not-editable',
        element: <EditGhostDenied />,
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

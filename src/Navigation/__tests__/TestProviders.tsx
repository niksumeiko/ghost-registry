import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

export function TestProviders({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient();

    return (
        <MemoryRouter
            initialEntries={[
                '/next-target',
                '/ghost/:id/edit',
                '/ghost-not-found',
                '/ghost-not-editable',
            ]}
        >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </MemoryRouter>
    );
}

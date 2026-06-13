import {patchGhost} from '../api/patchGhost.ts';
import {Ghost, GhostUpdate} from '../api/types.ts';
import {useMutation, useQueryClient} from '@tanstack/react-query';


interface HookResult {
    isLoading: boolean;
    error: Error | null;
    ghost: Ghost | null;
    update: (updatedData: GhostUpdate) => Promise<Ghost>;
}

export const useUpdateGhost = (id: string): HookResult => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        Ghost,
        Error,
        GhostUpdate
    >({
        mutationFn: (updatedData: GhostUpdate) =>
            patchGhost(id, updatedData),
        onSuccess: (data: Ghost) => {
            queryClient.setQueryData(['ghost', id], data);
        },
    });

    return {
        isLoading: mutation.status === 'pending',
        error: mutation.error ?? null,
        ghost: mutation.data ?? null,
        update: (updatedData: GhostUpdate) =>
            mutation.mutateAsync(updatedData),
    };
};
import {useQuery} from '@tanstack/react-query';
import {getGhost} from '../api/getGhost.ts';
import {Ghost} from '../api/types.ts';

interface HookResult {
    isLoading: boolean;
    error: Error | null;
    ghost: Ghost | null;
}

export const useSingleGhost = (id?: string): HookResult => {
    const { data, isLoading, error } = useQuery<Ghost | undefined>({
        queryKey: ['getSingleGhost', id],
        queryFn: () => getGhost(id!),
        enabled: Boolean(id),
    });

    return {
        isLoading,
        error: error ?? null,
        ghost: data ?? null,
    };
};
import {useQuery} from '@tanstack/react-query';
import {getNextTargetGhost} from '../api/getNextTargetGhost.ts';
import {Ghost} from "../api/types.ts";

interface HookResult {
    isLoading: boolean;
    error: Error | null;
    target: Ghost;
}

export const useNextTargetGhost = (): HookResult => {
    const {data, isLoading, error} = useQuery({
        queryKey: ['target'],
        queryFn: getNextTargetGhost,
    });

    return {
        isLoading,
        error,
        target: data,
    };
};
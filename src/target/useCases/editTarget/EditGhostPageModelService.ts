import type { Ghost } from '../../domain/GhostService.ts';

export class FormValidationError extends Error {
    constructor(public errors: string[]) {
        super('Validation failed');
    }
}

export function createEditGhostPageModel(
    query: {
        isLoading: boolean;
        data?: Ghost;
        error: Error | null;
    },
    mutation: { isPending: boolean; error: Error | null },
):
    | { state: 'LOADING' }
    | { state: 'ERROR' }
    | { state: 'DENIED' }
    | {
          state: 'INITIAL' | 'SUBMITTING';
          name: string;
          isCaught: boolean;
          error?: string;
      } {
    if (query.isLoading) {
        return { state: 'LOADING' };
    }

    if (query.error) {
        return { state: 'ERROR' };
    }

    if (!query.data) {
        return { state: 'LOADING' };
    }

    if (query.data.flags.includes('editable') === false) {
        return { state: 'DENIED' };
    }

    return {
        state: mutation.isPending ? 'SUBMITTING' : 'INITIAL',
        name: query.data.name,
        isCaught: query.data.flags.includes('caught'),
        error: mutation.error ? 'Something went wrong' : undefined,
    };
}

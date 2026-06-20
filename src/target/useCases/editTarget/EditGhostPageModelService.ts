import z from 'zod';
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
    formError?: unknown,
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

    let error: undefined | string;

    if (mutation.error) {
        error = 'Something went wrong';
    }

    if (formError instanceof FormValidationError) {
        error = formError.errors[0];
    }

    return {
        state: mutation.isPending ? 'SUBMITTING' : 'INITIAL',
        name: query.data.name,
        isCaught: query.data.flags.includes('caught'),
        error: error,
    };
}

export function getValidPayloadOrThrow(
    formData: FormData,
    ghost: Pick<Ghost, 'id' | 'flags'>,
) {
    const schema = z.object({
        name: z
            .string()
            .min(1, 'Missing ghost name')
            .max(10, "Ghost name can't be over 10 letters")
            .regex(/^[a-zA-Z]*$/, 'Ghost name can have only letters'),
        caught: z.boolean(),
    });

    const { success, error, data } = schema.safeParse({
        name: formData.get('name'),
        caught: formData.has('caught'),
    });

    if (!success) {
        const errors = error.issues.map(({ message }) => message);

        throw new FormValidationError(errors);
    }

    const flags: Ghost['flags'] = ghost.flags.filter(
        (flag) => flag !== 'caught',
    );

    if (data.caught) {
        flags.push('caught');
    }

    return {
        id: ghost.id,
        name: data.name,
        flags,
    };
}

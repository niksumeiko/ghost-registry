import { describe, expect, it } from 'vitest';
import { createEditGhostPageModel } from '../EditGhostPageModelService.ts';
import type { Ghost } from '../../../domain/GhostService.ts';

describe('edit ghost page model service', () => {
    // state: 'LOADING' | 'ERROR' | 'DENIED' | 'INITIAL' | 'SUBMITTING';
    // name: string;
    // isCaught: boolean;
    // error?: string;
    //
    // Input: GET query, PATCH mutation
    it('returns model when ghost is being fetched', () => {
        const queries = [
            { isLoading: true, error: null },
            { isLoading: false, data: undefined, error: null },
        ];
        const mutation = { isPending: false, error: null };

        queries.forEach((query) => {
            const result = createEditGhostPageModel(query, mutation);

            expect(result).toEqual({ state: 'LOADING' });
        });
    });

    it('returns model when ghost retrieval failed', () => {
        const query = { isLoading: false, error: new Error() };
        const mutation = { isPending: false, error: null };

        const result = createEditGhostPageModel(query, mutation);

        expect(result).toEqual({ state: 'ERROR' });
    });

    it('returns model when ghost is read-only', () => {
        const query = {
            isLoading: false,
            error: null,
            data: {
                id: 'x',
                name: 'y',
                classification: 'z',
                firstSeen: '01-01-2001',
                flags: [],
            } satisfies Ghost,
        };
        const mutation = { isPending: false, error: null };

        const result = createEditGhostPageModel(query, mutation);

        expect(result).toEqual({ state: 'DENIED' });
    });

    it('returns model when editable ghost is caught', () => {
        const query = {
            isLoading: false,
            error: null,
            data: {
                id: 'x',
                name: 'y',
                classification: 'z',
                firstSeen: '01-01-2001',
                flags: ['editable', 'caught'],
            } satisfies Ghost,
        };
        const mutation = { isPending: false, error: null };

        const result = createEditGhostPageModel(query, mutation);

        expect(result).toEqual({
            state: 'INITIAL',
            name: 'y',
            isCaught: true,
        });
    });

    it('returns model when editable ghost is being updated', () => {
        const query = {
            isLoading: false,
            error: null,
            data: {
                id: 'x',
                name: 'y',
                classification: 'z',
                firstSeen: '01-01-2001',
                flags: ['editable'],
            } satisfies Ghost,
        };
        const mutation = { isPending: true, error: null };

        const result = createEditGhostPageModel(query, mutation);

        expect(result).toEqual({
            state: 'SUBMITTING',
            name: 'y',
            isCaught: false,
        });
    });

    it('returns model when editable ghost update failed', () => {
        const query = {
            isLoading: false,
            error: null,
            data: {
                id: 'x',
                name: 'y',
                classification: 'z',
                firstSeen: '01-01-2001',
                flags: ['editable'],
            } satisfies Ghost,
        };
        const mutation = { isPending: false, error: new Error() };

        const result = createEditGhostPageModel(query, mutation);

        expect(result).toEqual({
            state: 'INITIAL',
            name: 'y',
            isCaught: false,
            error: 'Something went wrong',
        });
    });
});

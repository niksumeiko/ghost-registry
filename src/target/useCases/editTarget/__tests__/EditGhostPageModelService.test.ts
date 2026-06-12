import { describe, expect, it } from 'vitest';
import {
    createEditGhostPageModel,
    FormValidationError,
    getValidPayloadOrThrow,
} from '../EditGhostPageModelService.ts';
import type { Ghost } from '../../../domain/GhostService.ts';

describe('edit ghost page model service', () => {
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

    it('returns model when updated ghost candidate is invalid', () => {
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
        const formError = new FormValidationError(['z']);

        const result = createEditGhostPageModel(query, mutation, formError);

        expect(result).toEqual({
            state: 'INITIAL',
            name: 'y',
            isCaught: false,
            error: 'z',
        });
    });
});

describe('payload retrieval', () => {
    it('throws when ghost name is missing', () => {
        const formData = new FormData();
        formData.set('name', '');
        const ghost = { id: 'x', flags: [] };

        try {
            getValidPayloadOrThrow(formData, ghost);
            expect.unreachable();
        } catch (error) {
            const result = error as FormValidationError;

            expect(result).toBeInstanceOf(FormValidationError);
            expect(result.errors).toEqual(['Missing ghost name']);
        }
    });

    it('throws when ghost name is invalid', () => {
        const formData = new FormData();
        formData.set('name', '1');
        const ghost = { id: 'x', flags: [] };

        try {
            getValidPayloadOrThrow(formData, ghost);
            expect.unreachable();
        } catch (error) {
            const result = error as FormValidationError;

            expect(result).toBeInstanceOf(FormValidationError);
            expect(result.errors).toEqual(['Ghost name can have only letters']);
        }
    });

    it('throws when ghost name is over max length', () => {
        const formData = new FormData();
        formData.set('name', 'x'.repeat(11));
        const ghost = { id: 'y', flags: [] };

        try {
            getValidPayloadOrThrow(formData, ghost);
            expect.unreachable();
        } catch (error) {
            const result = error as FormValidationError;

            expect(result).toBeInstanceOf(FormValidationError);
            expect(result.errors).toEqual([
                "Ghost name can't be over 10 letters",
            ]);
        }
    });

    it('returns payload when ghost was caught', () => {
        const formData = new FormData();
        formData.set('name', 'x');
        formData.set('caught', 'on');
        const ghost = { id: 'y', flags: [] };

        const result = getValidPayloadOrThrow(formData, ghost);

        expect(result).toEqual({
            id: 'y',
            name: 'x',
            flags: ['caught'],
        });
    });

    it("returns payload when ghost wasn't caught", () => {
        const formData = new FormData();
        formData.set('name', 'x');
        const ghost = { id: 'y', flags: ['editable'] satisfies Ghost['flags'] };

        const result = getValidPayloadOrThrow(formData, ghost);

        expect(result).toEqual({
            id: 'y',
            name: 'x',
            flags: ['editable'],
        });
    });
});

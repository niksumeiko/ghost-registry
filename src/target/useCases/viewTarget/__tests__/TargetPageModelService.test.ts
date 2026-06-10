import { describe, expect, it } from 'vitest';
import { createTargetPageModel } from '../TargetPageModelService.ts';
import { type Ghost } from '../../../domain/GhostService';

describe('target page model', () => {
    it('returns model when target is being fetched', () => {
        const queries = [
            { isLoading: true, error: null },
            { isLoading: false, data: undefined, error: null },
        ];

        queries.forEach((query) => {
            const result = createTargetPageModel(query);

            expect(result).toEqual({ state: 'LOADING' });
        });
    });

    it('returns model when target retrieval failed', () => {
        const query = { isLoading: false, error: new Error() };

        const result = createTargetPageModel(query);

        expect(result).toEqual({
            state: 'ERROR',
        });
    });

    it('returns model when target is caught and read-only', () => {
        const query = {
            isLoading: false,
            data: {
                id: 'x',
                name: 'y',
                classification: 'z',
                firstSeen: '01-01-2001',
                flags: ['caught'],
            } satisfies Ghost,
            error: null,
        };

        const result = createTargetPageModel(query);

        expect(result).toEqual({
            state: 'SUCCESS',
            isCaught: true,
            isEditable: false,
            id: 'x',
            identity: '#x',
            name: 'y',
            classification: 'z',
            dateFirstSeen: '01-01-2001',
        });
    });

    it("returns model when target isn't caught and is editable", () => {
        const query = {
            isLoading: false,
            data: {
                id: 'x',
                name: 'y',
                classification: 'z',
                firstSeen: '01-01-2001',
                flags: ['editable'],
            } satisfies Ghost,
            error: null,
        };

        const result = createTargetPageModel(query);

        expect(result).toEqual({
            state: 'SUCCESS',
            isCaught: false,
            isEditable: true,
            id: 'x',
            identity: '#x',
            name: 'y',
            classification: 'z',
            dateFirstSeen: '01-01-2001',
        });
    });
});

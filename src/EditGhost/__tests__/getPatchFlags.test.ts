import {getPatchFlags} from "../getPatchFlags.ts";
import {describe, expect, it} from 'vitest';

describe('getPatchFlags', () => {
    it('returns flags reflecting a caught ghost', () => {
        const flags = ['editable'];
        const isCaught = true;

        expect(getPatchFlags(flags, isCaught)).toEqual(['editable', 'caught']);
    });

    it('returns flags reflecting a not-caught ghost', () => {
        const flags = ['editable', 'caught'];
        const isCaught = false;

        expect(getPatchFlags(flags, isCaught)).toEqual(['editable']);
    });

    it('returns flags avoiding a duplicate entry', () => {
        const flags = ['editable', 'caught'];
        const isCaught = true;

        expect(getPatchFlags(flags, isCaught)).toEqual(['editable', 'caught']);
    });
});
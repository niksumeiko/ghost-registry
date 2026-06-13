import {describe, expect, it} from 'vitest';
import {isCaught, isEditable} from "../flagService.ts";

describe('flagService', () => {
    describe('isEditable', () => {
        it('return true when ghost can be edited', () => {
            const flags = ['editable'];

            expect(isEditable(flags)).toBe(true);
        });

        it('return false when ghost cannot be edited', () => {
            const flags: string[] = [];

            expect(isEditable(flags)).toBe(false);
        });
    });

    describe('isCaught', () => {
        it('return true when ghost is caught', () => {
            const flags = ['caught'];

            expect(isCaught(flags)).toBe(true);
        });

        it('return false when ghost is not caught', () => {
            const flags: string[] = [];

            expect(isCaught(flags)).toBe(false);
        });
    });
});
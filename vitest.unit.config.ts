/// <reference types="vitest/config" />
import {defineConfig} from 'vite';

export default defineConfig({
    extends: './vite.config.ts',
    test: {
        globals: true,
        name: 'unit',
        include: ['src/**/*.test.{ts,tsx}'],
        exclude: ['src/**/__tests__/*.test.tsx'],
    },
});

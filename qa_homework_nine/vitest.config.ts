import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['test/vitest/**/*.test.ts'],
        exclude: ['test/mocha/**', 'node_modules/**', 'build/**']
    }
});

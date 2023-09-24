import { defineConfig } from 'vite';

export default defineConfig({
  base: '/TicCatToe',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
});

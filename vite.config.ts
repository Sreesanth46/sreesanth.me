import vue from '@vitejs/plugin-vue';
import { resolve } from 'node:path';
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import VueRouter from 'vue-router/vite';
import MotionResolver from 'motion-v/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({ dts: 'src/route-map.d.ts' }),
    vue(),
    AutoImport({
      include: [
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': [
            'useTitle',
            'useWindowSize',
            'useRafFn',
            'useFetch',
            'usePreferredReducedMotion',
          ],
        },
        {
          from: '@vueuse/core',
          imports: ['Fn'],
          type: true,
        },
      ],
      dirsScanOptions: {
        filePatterns: ['*.ts'], // Glob patterns for matching files
        fileFilter: (file) => file.endsWith('.ts'), // Filter files
        types: true, // Enable auto import the types under the directories
      },
      dirs: [
        './src/composables/**',
        './src/utils/**',
        './src/blogs.ts',
        './src/globals',
        './src/contexts/**',
      ],
      dts: true,
      vueTemplate: true,
      viteOptimizeDeps: true,
    }),
    Components({
      resolvers: [ElementPlusResolver(), MotionResolver()],
      dts: true,
      globs: ['src/components/*.vue', 'src/icons/**/*.vue'],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/, /\.md$/],
    }),
  ],
  resolve: {
    alias: [{ find: '~/', replacement: `${resolve(__dirname, 'src')}/` }],
  },
  base: '/',
  build: {
    rollupOptions: {
      output: {},
    },
  },
});

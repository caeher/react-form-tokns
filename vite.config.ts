import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Library build mode
  if (mode === 'lib') {
    return {
      plugins: [react(), tailwindcss(), cssInjectedByJsPlugin()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/lib/index.ts'),
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
        },
        rollupOptions: {
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            '@internationalized/date',
            'lucide-react',
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
        sourcemap: true,
        minify: false,
      },
    }
  }

  // Development mode (app demo)
  return {
    root: 'playground',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@caeher/react-form-tokns': resolve(__dirname, 'src/lib/index.ts'),
      },
    },
  }
})

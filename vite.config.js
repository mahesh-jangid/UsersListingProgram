// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

//// <!-- this file for the Vite which load Front-end vert fast for the development. Copied from https://github.com/joaopaulomoraes/reactjs-vite-tailwindcss-boilerplate/blob/main/src/index.tsx-->
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';
import dotenv from 'dotenv';
import { join } from 'path';
import jsconfigPaths from 'vite-jsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths(), macrosPlugin()],
  define: {
    // this is for the getting the env variable from the .env
    'process.env': dotenv.config({ path: join(__dirname, '.env') }).parsed || {},
  },
  server: {
    port: 5173,
  },
  optimizeDeps: {
    include: ['react-window'],
  },
});

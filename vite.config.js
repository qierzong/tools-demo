import { defineConfig } from 'vite'
import { readFileSync } from 'fs';
import { resolve } from 'path';

import react from '@vitejs/plugin-react'
const base64Loader = {
  name: 'base64-loader',
  transform(_, id) {
    const [path, query] = id.split('?');

    if (query != 'base64') {
      return null;
    }

    const fileName = path.split('/').pop();
    const fileType = fileName.split('.').pop();

    if (
      [
        'jpg',
        'jpeg',
        'png',
        'svg',
      ].indexOf(fileType) < 0
    ) {
      // not support
      return null;
    }

    const base64 = readFileSync(path, {
      encoding: 'base64',
    });

    return `export default 'data:image/${fileType};base64,${base64}';`;
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    base64Loader,
    react()
  ],
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
  },
})

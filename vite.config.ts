import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

async function simplifyStructuredIndexHtml(distDir: string) {
  const indexPath = resolve(distDir, 'index.html');
  let indexHtml = await readFile(indexPath, 'utf8');
  const charsetTag = indexHtml.match(/<meta charset="[^"]+">/)?.[0] ?? '<meta charset="UTF-8">';
  const viewportTag =
    indexHtml.match(/<meta name="viewport"[^>]*>/)?.[0] ??
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  const titleTag = indexHtml.match(/<title>[\s\S]*?<\/title>/)?.[0] ?? '<title>App</title>';
  const stylesheetTag =
    indexHtml.match(/<link rel="stylesheet"[^>]*href="[^"]+"[^>]*>/)?.[0] ??
    '<link rel="stylesheet" crossorigin href="./styles.css">';
  const rebuiltHead = [
    '  <head>',
    `    ${charsetTag}`,
    `    ${viewportTag}`,
    `    ${titleTag}`,
    `    ${stylesheetTag}`,
    '    <script type="module" crossorigin src="./main.js"></script>',
    '  </head>',
  ].join('\n');

  indexHtml = indexHtml.replace(/<head>[\s\S]*?<\/head>/, rebuiltHead);
  await writeFile(indexPath, indexHtml);
}

async function removeDistNoise(distDir: string) {
  const entries = await readdir(distDir, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      if (!['.gitkeep', '.DS_Store', 'app.ts', 'svgs.svg'].includes(entry.name)) {
        return;
      }

      await rm(resolve(distDir, entry.name), { recursive: true, force: true });
    }),
  );
}

async function ensureNoJekyllFile(distDir: string) {
  await writeFile(resolve(distDir, '.nojekyll'), '');
}

function structuredDistPlugin(): Plugin {
  return {
    name: 'structured-dist',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const distDir = resolve(process.cwd(), 'dist');
      await simplifyStructuredIndexHtml(distDir);
      await removeDistNoise(distDir);
      await ensureNoJekyllFile(distDir);
    },
  };
}

export default defineConfig({
  base: './',
  build: {
    emptyOutDir: true,
    modulePreload: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles.css';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  plugins: [structuredDistPlugin()],
});

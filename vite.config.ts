import { readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';

function inlineSingleFileBuild(): Plugin {
  return {
    name: 'inline-single-file-build',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      const distDir = resolve(process.cwd(), 'dist');
      const htmlPath = resolve(distDir, 'index.html');
      let html = await readFile(htmlPath, 'utf8');

      const stylesheetMatches = Array.from(
        html.matchAll(/<link rel="stylesheet" crossorigin href="([^"]+)">/g),
      );

      for (const match of stylesheetMatches) {
        const assetPath = match[1];
        if (!assetPath.includes('/assets/')) {
          continue;
        }

        const cssPath = resolve(distDir, assetPath.replace(/^\//, ''));
        const css = await readFile(cssPath, 'utf8');
        html = html.replace(match[0], () => `<style>\n${css}\n</style>`);
      }

      const scriptMatches = Array.from(
        html.matchAll(/<script type="module" crossorigin src="([^"]+)"><\/script>/g),
      );

      for (const match of scriptMatches) {
        const assetPath = match[1];
        if (!assetPath.includes('/assets/')) {
          continue;
        }

        const jsPath = resolve(distDir, assetPath.replace(/^\//, ''));
        const js = await readFile(jsPath, 'utf8');
        html = html.replace(match[0], () => `<script type="module">\n${js}\n</script>`);
      }

      const firstScriptIndex = html.indexOf('<script type="module">');
      if (firstScriptIndex !== -1) {
        const headMarkup = html.slice(0, firstScriptIndex);
        const normalizedHeadMarkup = headMarkup
          .replace(/^<!doctype html>/i, '<!DOCTYPE html>')
          .replace(/<meta([^>]*?)\s*\/>/g, '<meta$1>');

        html = normalizedHeadMarkup + html.slice(firstScriptIndex);
      }

      await rm(resolve(distDir, 'app.ts'), { force: true });
      await rm(resolve(distDir, 'assets'), { recursive: true, force: true });
      await writeFile(htmlPath, html);
    },
  };
}

export default defineConfig({
  build: {
    cssCodeSplit: false,
  },
  plugins: [inlineSingleFileBuild()],
});

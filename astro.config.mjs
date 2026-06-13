// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// NOTE: update `site` to the real production domain before launch.
// It drives canonical URLs, absolute Open Graph image URLs, and the sitemap.
export default defineConfig({
  site: 'https://www.innovationinsociety.org',
  output: 'static',
  integrations: [sitemap()],
});

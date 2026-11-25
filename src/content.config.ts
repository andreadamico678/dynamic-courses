import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const scope = process.env.COURSE_SCOPE || 'all';

function scopedDocsLoader() {
  if (scope === 'hub') {
    return glob({ base: './src/content/docs', pattern: 'index.mdx' });
  }
  if (scope !== 'all') {
    return glob({
      base: `./src/content/docs/${scope}`,
      pattern: '**/[^_]*.{md,mdx}',
    });
  }
  return docsLoader();
}

export const collections = {
  docs: defineCollection({
    loader: scopedDocsLoader(),
    schema: docsSchema(),
  }),
};

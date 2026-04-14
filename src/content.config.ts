import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * News Collection
 * Managed via Decap CMS or direct Markdown editing
 */
const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    description: z.string(),
  }),
});

/**
 * Career Collection
 * Managed via Decap CMS or direct Markdown editing
 */
const career = defineCollection({
  loader: glob({ base: './src/content/career', pattern: '**/*.md' }),
  schema: z.object({
    position: z.string(),
    type: z.enum(['Full-time', 'Contract']),
    location: z.string(),
    description: z.string(),
    requirements: z.array(z.string()),
  }),
});

export const collections = { news, career };

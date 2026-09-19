import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    serviceType: z.string().optional(),
    specifications: z.array(z.string()).optional(),
    useCases: z.array(z.string()).optional(),
    order: z.number().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    clientType: z.string().optional(),
    objective: z.string().optional(),
    serviceProvided: z.string().optional(),
    materials: z.array(z.string()).optional(),
    process: z.string().optional(),
    result: z.string().optional(),
    images: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { services, projects };
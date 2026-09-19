import businessData from '../data/business.json';

export const siteConfig = {
  ...businessData,
} as const;

export type SiteConfig = typeof siteConfig;

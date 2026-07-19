import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { services } from '@/data/services';
import { blogPosts } from '@/data/blog-posts';

const BASE_URL = 'https://greenstudioqatar.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'ar'];

  const staticPages = [
    '',
    '/about',
    '/projects',
    '/services',
    '/team',
    '/contact',
    '/consultation',
    '/journal',
    '/privacy',
    '/terms',
  ];

  const staticRoutes: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      staticRoutes.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${page}`,
            ar: `${BASE_URL}/ar${page}`,
            'x-default': `${BASE_URL}/en${page}`,
          },
        },
      });
    }
  }

  const projectRoutes: MetadataRoute.Sitemap = [];
  for (const project of projects) {
    for (const locale of locales) {
      projectRoutes.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/projects/${project.slug}`,
            ar: `${BASE_URL}/ar/projects/${project.slug}`,
            'x-default': `${BASE_URL}/en/projects/${project.slug}`,
          },
        },
      });
    }
  }

  const serviceRoutes: MetadataRoute.Sitemap = [];
  for (const service of services) {
    for (const locale of locales) {
      serviceRoutes.push({
        url: `${BASE_URL}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/services/${service.slug}`,
            ar: `${BASE_URL}/ar/services/${service.slug}`,
            'x-default': `${BASE_URL}/en/services/${service.slug}`,
          },
        },
      });
    }
  }

  const blogRoutes: MetadataRoute.Sitemap = [];
  for (const post of blogPosts) {
    for (const locale of locales) {
      blogRoutes.push({
        url: `${BASE_URL}/${locale}/journal/${post.slug}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/journal/${post.slug}`,
            ar: `${BASE_URL}/ar/journal/${post.slug}`,
            'x-default': `${BASE_URL}/en/journal/${post.slug}`,
          },
        },
      });
    }
  }

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...blogRoutes];
}

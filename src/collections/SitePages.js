import { siteContentReadAccess } from '../access/collection-access.js';
import { isMasterAdmin } from '../access/roles.js';

/** @type {import('payload').CollectionConfig} */
export const SitePages = {
  slug: 'site-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Website',
    hidden: ({ user }) => !isMasterAdmin(user),
  },
  access: siteContentReadAccess,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description:
          'Use route slug: project, Investors, builders, blog, about-us',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'canonicalPath', type: 'text' },
      ],
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'heading', type: 'text' },
        { name: 'subheading', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'ctaLabel', type: 'text' },
        { name: 'ctaLink', type: 'text' },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        {
          slug: 'feature-grid',
          labels: {
            singular: 'Feature Grid',
            plural: 'Feature Grids',
          },
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
                { name: 'icon', type: 'upload', relationTo: 'media' },
                { name: 'iconPath', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'faq',
          labels: {
            singular: 'FAQ',
            plural: 'FAQs',
          },
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'id', type: 'text', required: true },
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          slug: 'timeline',
          labels: {
            singular: 'Timeline',
            plural: 'Timelines',
          },
          fields: [
            { name: 'title', type: 'text' },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'period', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          slug: 'contributors',
          labels: {
            singular: 'Contributors',
            plural: 'Contributors',
          },
          fields: [
            { name: 'title', type: 'text' },
            { name: 'subtitle', type: 'textarea' },
            {
              name: 'items',
              type: 'array',
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'role', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
                { name: 'linkedin', type: 'text' },
                { name: 'image', type: 'upload', relationTo: 'media' },
                { name: 'imagePath', type: 'text' },
              ],
            },
          ],
        },
        {
          slug: 'cta',
          labels: {
            singular: 'CTA',
            plural: 'CTAs',
          },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'buttonLabel', type: 'text' },
            { name: 'buttonLink', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'replaceExistingPage',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'When enabled, this CMS page fully replaces the hardcoded page route.',
      },
    },
  ],
};

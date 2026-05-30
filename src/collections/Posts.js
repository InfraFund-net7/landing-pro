import { contentCollectionAccess } from '../access/collection-access.js';

/** @type {import('payload').CollectionConfig} */
export const Posts = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', 'published'],
    group: 'Content',
  },
  access: contentCollectionAccess,
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.published && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
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
        description: 'URL segment, e.g. tokenization-green-assets',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'mainContent',
      label: 'Main Content',
      type: 'textarea',
      admin: {
        description: 'Long-form post content shown on the post detail page.',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      defaultValue: '5 min read',
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Editorial',
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Insights',
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'All', value: 'all' },
        { label: 'Blockchain', value: 'blockchain' },
        { label: 'Infrastructure', value: 'infrastructure' },
        { label: 'Tokenization', value: 'tokenization' },
        { label: 'Impact', value: 'impact' },
        { label: 'Research', value: 'research' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

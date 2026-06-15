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
      admin: {
        description:
          'Estimated reading time shown on the blog, e.g. 8 min read.',
      },
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'Editorial',
      admin: {
        description: 'Display name when no linked author profile is set.',
      },
    },
    {
      name: 'authorUser',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Links to a CMS user profile for name, title, and photo.',
        position: 'sidebar',
      },
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Insights',
    },
    {
      name: 'categories',
      type: 'text',
      hasMany: true,
      admin: {
        description: 'One or more categories (any label the editor chooses).',
      },
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

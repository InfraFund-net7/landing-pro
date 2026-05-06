/** @type {import('payload').GlobalConfig} */
export const HomePage = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Website',
  },
  fields: [
    {
      name: 'operatingSystem',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'textarea', required: true },
        {
          name: 'images',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'alt', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'whyChoose',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'cards',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'icon', type: 'upload', relationTo: 'media', required: false },
            {
              name: 'bottomSpacing',
              type: 'text',
              required: false,
              admin: {
                description: 'Optional CSS spacing value, example: 70px',
              },
            },
            {
              name: 'order',
              type: 'number',
              required: false,
            },
          ],
        },
      ],
    },
    {
      name: 'transparency',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'subheading', type: 'textarea', required: true },
        {
          name: 'steps',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
          ],
        },
      ],
    },
    {
      name: 'funding',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'cards',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            {
              name: 'iconKey',
              type: 'select',
              options: [
                { label: 'Zap', value: 'zap' },
                { label: 'Chart', value: 'chart' },
                { label: 'Dollar', value: 'dollar' },
                { label: 'Heart', value: 'heart' },
              ],
              required: false,
            },
            { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
          ],
        },
      ],
    },
    {
      name: 'investment',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'ctaLabel', type: 'text', required: true },
        { name: 'ctaLink', type: 'text', required: true },
        {
          name: 'projects',
          type: 'array',
          fields: [
            { name: 'category', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'fundingTarget', type: 'text', required: true },
            { name: 'projectedReturn', type: 'text', required: true },
            { name: 'fundingStatus', type: 'number', required: true },
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
          ],
        },
        {
          name: 'modalTabs',
          type: 'array',
          minRows: 4,
          maxRows: 4,
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'content', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'trusted',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'partners',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media', required: true },
            { name: 'alt', type: 'text', required: true },
          ],
        },
        {
          name: 'testimonials',
          type: 'array',
          fields: [
            { name: 'quote', type: 'textarea', required: true },
            { name: 'name', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'avatar', type: 'upload', relationTo: 'media', required: false },
          ],
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'subheading', type: 'textarea', required: true },
        { name: 'buttonLabel', type: 'text', required: true },
        {
          name: 'actions',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            {
              name: 'type',
              type: 'select',
              options: [
                { label: 'Book Meeting', value: 'booking' },
                { label: 'Send Email', value: 'email' },
              ],
              required: true,
            },
          ],
        },
      ],
    },
  ],
};

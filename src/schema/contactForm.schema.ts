import { z } from 'zod';

export const contactFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  message: z.string().min(1, 'Message is required'),
  subject: z.string().min(1, 'Subject is required'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

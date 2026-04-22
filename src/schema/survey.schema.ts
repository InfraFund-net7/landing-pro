import { z } from 'zod';

export const individualStep5Schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
});

export const orgStep5Schema = z.object({
  contactFullName: z.string().min(1, 'Contact Full Name is required'),
  companyName: z.string().min(1, 'Company Name is required'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
});

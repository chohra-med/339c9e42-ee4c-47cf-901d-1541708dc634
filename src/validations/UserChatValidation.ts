import { z } from 'zod';

export const SaveChatValidation = z.object({
  id: z.string().min(1),
  body: z.string().min(1),
});

export const GetChatValidation = z.object({
  userId: z.coerce.number(),
  body: z.string().min(1),
});

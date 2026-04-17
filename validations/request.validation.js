import { z } from 'zod';
//zod is a TypeScript-first schema declaration and validation library. 
// It allows you to define schemas for your data and validate them against those schemas.

export const signupPostRequestBodySchema = z.object({
  firstname: z.string(),
  lastname: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(4),
})

export const loginPostRequesBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
})


export const shortenPostREquestBodySchema = z.object({
  url: z.string().url(),
  shortCode: z.string().optional(),
});
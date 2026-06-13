import {z} from 'zod';

export const editGhostPageSchema = z.object({
    name: z.string().min(1, 'Name is required').max(10, 'Name must be at most 10 characters').regex(/^[\p{L} ]+$/u, 'Only letters and spaces are allowed'),
    isCaught: z.boolean(),
});


export type GhostFormData = z.infer<typeof editGhostPageSchema>;
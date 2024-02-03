import { z } from 'zod';

export const registerUpdateTaskSchema = z.object({
    title: z.string({
        required_error: 'El "Titulo" es obligatorio.'
    }),
    description: z.string({
        required_error: 'La "Descripción" es obligatoria.'
    })
})



import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El "Nombre de usuario" es requerido.'
    }),
    email: z.string({
        required_error: 'El "Email" es requerido'
    }).email({
        message: 'El "Email" es invalido'
    }),
    password: z.string({
        required_error: 'La "Contraseña" es obligatoria.'
    }).min(8, {
        message: 'La "Contraseña" no debe de tener menos de 8 caracteres'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El "Email" es requerido'
    }).email({
        message: 'El "Email" es invalido'
    }),
    password: z.string({
        required_error: 'La "Contraseña" es obligatoria.'
    }).min(8, {
        message: 'La "Contraseña" no debe de tener menos de 8 caracteres'
    })
})


import {z} from 'zod'

export const registerUserSchema = z.object({
    full_name: z.string().max(140, "Names must have 140 characters or less").nullish(),
    email: z.string().email(),
    password: z.string().min(6, "Passwords must be at least 6 characters").max(64, "Passwords must not be longer than 64 characters"),
    passwordConfirm: z.string().min(6, "Passwords must be at least 6 characters").max(64, "Passwords must not be longer than 64 characters")
})

export const profileSchema = registerUserSchema.pick({ full_name: true })
export type ProfileSchema = typeof profileSchema
export const emailSchema = registerUserSchema.pick({ email: true })
export type EmailSchema = typeof emailSchema
export const passwordSchema = registerUserSchema.pick({ password: true, passwordConfirm: true  })
export type PasswordSchema = typeof passwordSchema
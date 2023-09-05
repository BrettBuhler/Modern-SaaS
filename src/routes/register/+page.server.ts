import { z } from 'zod'
import type { Actions, PageServerLoad } from "./$types"
import { setError, superValidate } from 'sveltekit-superforms/server'
import { fail } from '@sveltejs/kit'

const registerUserSchema = z.object({
    full_name: z.string().max(140, "Names must have 140 characters or less").nullish(),
    email: z.string().email(),
    password: z.string().min(6, "Passwords must be at least 6 characters").max(64, "Passwords must not be longer than 64 characters"),
    passwordConfirm: z.string().min(6, "Passwords must be at least 6 characters").max(64, "Passwords must not be longer than 64 characters")
})

export const load: PageServerLoad = async (event) => {
    return {
        form: superValidate(registerUserSchema)
    }
}

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, registerUserSchema)
        console.log(form)

        if (!form.valid) {
            return fail(400,{ form })
        }

        if (form.data.password !== form.data.passwordConfirm) {
            return setError(form, "passwordConfirm", "Passwords don't match!")
        }

        const { error: authError } = await event.locals.supabase.auth.signUp({
            email: form.data.email,
            password: form.data.password,
            options: {
                data: {
                    full_name: form.data.full_name || ""
                }
            }
        })

        if (authError) {
            return setError(form, null, "Error occurred while registering!")
        }
        return { form }
    }
}
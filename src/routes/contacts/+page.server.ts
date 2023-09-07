import { redirect, type Actions, error, fail } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { setError, superValidate } from "sveltekit-superforms/server"
import { createContactSchema } from "$lib/schemas"
import { supabaseAdmin } from "$lib/server/supabase-admin"

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.getSession()
    if (!session) {
        throw redirect(302, '/login')
    }
    return {
        createContactForm: superValidate(createContactSchema)
    }
}

export const actions: Actions = {
    createContact: async (event) => {
        const session = await event.locals.getSession()
        if (!session) {
            throw error(401, "Unauthorized")
        }

        const createContactForm = await superValidate(event, createContactSchema)

        if (!createContactForm.valid) {
            return fail(400, {
                createContactForm
            })
        }

        const { error: createContactError } = await supabaseAdmin.from("contacts").insert({
            ...createContactForm.data,
            user_id: session.user.id
        })

        if (createContactError) {
            console.log(createContactError)
            return setError(createContactForm, null, "Error creating contact.")
        }
        return {
            createContactForm
        }
    }
}
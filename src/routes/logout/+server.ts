import type { RequestHandler } from "@sveltejs/kit"
import { error, redirect } from "@sveltejs/kit"

export const POST: RequestHandler = async (event) => {
    const { error: logoutError } = await event.locals.supabase.auth.signOut()

    if (logoutError) {
        throw error(500, "Error logging out out. Please try again.")
    }

    throw redirect(302, "/login")
}
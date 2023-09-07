import { clearSupabase, startSupabase, createUser } from "./utils";

async function seed() {
    try {
        await startSupabase()
        await clearSupabase()
        await createUser({ email: "t@t.com", full_name: "Test user", password: "password123"})

    } catch (error) {
        console.error(error)
        process.exit(1)
    }
    process.exit()
}

seed()
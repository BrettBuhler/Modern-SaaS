import * as dotenv from 'dotenv'
dotenv.config()

const getEnvironmentVariable = (envVar: string): string => {
    const validVar = process.env[envVar]
    if (!validVar) throw new Error(`Could not find environment variable: ${envVar}`)
    return validVar
}

export const ENV = {
    PUBLIC_SUPABASE_ANON_KEY: getEnvironmentVariable('PUBLIC_SUPABASE_ANON_KEY'),
    PUBLIC_SUPABASE_URL: getEnvironmentVariable('PUBLIC_SUPABASE_URL'),
    SUPABASE_DB_URL: getEnvironmentVariable('SUPABASE_DB_URL'),
    SUPABASE_SERVICE_ROLE_KEY: getEnvironmentVariable('SUPABASE_SERVICE_ROLE_KEY')
}

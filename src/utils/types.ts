declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_AUTH_TOKEN: string;
            DISCORD_APLICATION_ID: string;
        }
    }
}

export {};
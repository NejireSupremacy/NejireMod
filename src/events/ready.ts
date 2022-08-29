import { Ready } from "@biscuitland/core";

export default {
    name: 'ready',
    when: 'once',
    async execute(client: Ready) {
        console.log(`Logged in as ${client.user.username}`);
    }
}
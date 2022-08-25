export default {
    name: 'ready',
    when: 'once',
    execute(client) {
        console.log(`Logged in as ${client.user.username}`);
    }
}
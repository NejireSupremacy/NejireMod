import 'dotenv/config';

import { commandList } from './utils/commandList.js';

const commandListKeys = Object.keys(commandList);
const commandArray = [];

for (const command of commandListKeys) {
    const { data } = commandList[command].default;

    commandArray.push(data);
}

(async () => {
    const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_APLICATION_ID}/commands`

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': `Bot ${process.env.DISCORD_AUTH_TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(commandArray)
    });

    const data = await response.json();
    console.log(data);

})()
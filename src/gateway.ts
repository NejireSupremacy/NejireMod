import 'dotenv/config';
import WebSocket from 'ws';

import { GatewayIntents } from '@biscuitland/api-types';
import { DefaultRestAdapter } from '@biscuitland/rest';
import { ShardManager } from '@biscuitland/ws';

import type { DiscordGetGatewayBot } from '@biscuitland/api-types';

const rest = new DefaultRestAdapter({
    token: process.env.DISCORD_AUTH_TOKEN,
});

let is: any = null;
let ws: WebSocket | null;

const ask = () => {
    ws = new WebSocket(`ws://${process.env.WS_URL}:${process.env.WS_PORT}`).on('error', () => ws?.close()).on('close', () => {
        if (is == null) {
            is = setInterval(() => {
                ask();
            }, 10000);
        }
    }).on('open', () => {
        clearInterval(is);
        is = null;
    });
};

ask();

const boostrap = async () => {

    const gwy = await rest.get<DiscordGetGatewayBot>('/gateway/bot');

    const sck = new ShardManager({
        config: {
            token: process.env.DISCORD_AUTH_TOKEN,
            intents: GatewayIntents.Guilds | GatewayIntents.GuildMessages,
		
        },
        workers: {
            shards: 1,
            amount: 1,
            delay: 5000
        },
        gateway: gwy,

        handleDiscordPayload: (shard, data) => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ id: shard.options.id, payload: data }));
            }
        },
    });

    await sck.spawns();
};

boostrap();
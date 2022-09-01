import 'dotenv/config';

import { Session, Actions} from '@biscuitland/core';
import { WebSocketServer } from 'ws';
import { GatewayIntents } from '@biscuitland/api-types';

import { eventsListener } from './loadHandlers.js';

const intents = GatewayIntents.Guilds;
const textDecoder = new TextDecoder();

export const session = new Session({
    token: process.env.DISCORD_AUTH_TOKEN,
    intents: intents,
});

const app = new WebSocketServer({ port: process.env.WS_PORT });

const boot = async () => {
    await eventsListener(session);
};

app.on('connection', ws => {
    ws.on('message', (uint: Buffer | ArrayBuffer) => {
        const decompressable = new Uint8Array(uint);
        const data = JSON.parse(textDecoder.decode(decompressable));

        Actions.raw(session, data.id, data.payload);

        if (!data.payload.t || !data.payload.d) return;

        Actions[data.payload.t as keyof typeof Actions]?.(
            session,
            data.id,
            data.payload.d
        );
    });
});

boot();
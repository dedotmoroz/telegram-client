import dotenv from 'dotenv';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { startClient } from './auth';
import { replyBuilder } from './replyBuilder';
import { lordUser } from './store';

dotenv.config();

/**
 * Variables
 */
const apiId = parseInt(process.env.API_ID, 10);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.SESSION);

/**
 * TelegramClient
 */
lordUser.telegramClient = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

/**
 * Start & Handle
 */
(async () => {
    await startClient(stringSession);
    lordUser.telegramClient.addEventHandler(replyBuilder);
})();





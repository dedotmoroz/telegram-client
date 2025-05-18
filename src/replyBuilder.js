import { openaiResponse } from './openaiService';
import {
    userHistory,
    aiMode,
    usersObj,
    lordUser,
} from './store';
import {
    sendTypingEffectAndMessage,
    getUserObj,
    fillChatHistory,
    fillUsersHash,
} from './helpers';

/**
 * Reply handler
 */
export async function replyBuilder(update) {
    const client = lordUser.telegramClient;
    if (update.message || update.className === 'UpdateShortMessage') {
        const message = update.message || '';
        const userIdString = Number(update.userId.value).toString()
        if (!usersObj[userIdString]) {
            await fillUsersHash(client);
        }
        const userChat = getUserObj({userIdString, usersObj});
        const isOutgoing = update.out;

        if (isOutgoing && userChat) {
            if (message?.toLowerCase() === 'on') {
                aiMode[userIdString] = true;
                await client.deleteMessages(userChat, [update.id], {revoke: true});
                await fillChatHistory({client, userChat, lordUser, userHistory, userIdString});
            }
            if (message?.toLowerCase() === 'off') {
                aiMode[userIdString] = false;
                await client.deleteMessages(userChat, [update.id], {revoke: true});
            }
        }

        if (!isOutgoing && userChat && aiMode[userIdString]) {
            userHistory[userIdString].push({role: 'user', content: message});
            const botReply = await openaiResponse(userIdString);
            if (botReply) {
                await sendTypingEffectAndMessage({client, userIdString, message: botReply, userChat});
                await client.sendMessage(userChat, {message: botReply});
            }
        }
    }
}
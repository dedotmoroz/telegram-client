import { Api } from 'telegram';

/**
 * Имитация "печатает..." перед отправкой ответа
 */
export async function sendTypingEffectAndMessage({client, message, userChat}) {
    try {
        await client.invoke(new Api.messages.SetTyping({
            peer: userChat,
            action: new Api.SendMessageTypingAction()
        }));
        const typingSpeed = 200;
        const maxDelay = 20000;
        let delay = message.length * typingSpeed;
        if (delay > maxDelay) {
            delay = maxDelay;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
    }
}

/**
 * Получает userChat
 */
export const getUserObj = ({userIdString, usersObj}) => {
    const userId = BigInt(userIdString);
    const accessHash = BigInt(usersObj[userIdString].access_hash);

    return new Api.InputPeerUser({
        userId,
        accessHash,
    });
}

/**
 * Заполняет History для AI чата из History чата в Telegram
 */
export async function fillChatHistory({client, userChat, lordUser, userHistory, userIdString}){
    const historyArr = [];

    const messages = await client.getMessages(userChat, { limit: 20 });
    for (const msg of messages) {
        if (msg instanceof Api.Message && msg.message) {
            const from = msg.fromId instanceof Api.PeerUser ? `User ${msg.fromId.userId}` : "Unknown";
            const role = Number(msg.fromId?.userId).toString() === lordUser ? 'assistant' : 'user'
            historyArr.unshift({role, content: msg.message})
        }
    }

    userHistory[userIdString] = [];
    userHistory[userIdString].push({ role: "system", content: process.env.AI_ROLE });
    userHistory[userIdString].push(...historyArr);
}
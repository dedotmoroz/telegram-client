import dotenv from 'dotenv';
import { TelegramClient, Api } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { OpenAI } from 'openai';
import input from 'input';

import { sendTypingEffectAndMessage, getUserObj, fillChatHistory } from './helpers';

dotenv.config();

/**
 * Variables
 */
const apiId = parseInt(process.env.API_ID, 10);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.SESSION);
const YOUR_CHAT_ID = parseInt(process.env.YOUR_CHAT_ID, 10);
const apiKey = process.env.OPENAI_API_KEY_KIRILL;

/**
 * TelegramClient
 */
const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
});

/**
 * Create an OpenAI client
 */
const openai = new OpenAI({
    apiKey,
});

/**
 * Store chat history for each user
 */
const userHistory = {};
let aiMode = {};

/**
 * Users Hash
 */
const usersObj = {}


/**
 * lordUser
 */
let lordUser = ''


/**
 * Функция авторизации
 */
async function startClient() {
    if (!stringSession) {
        await client.start({
            phoneNumber: async () => await input.text('Введите ваш номер телефона: '),
            password: async () => await input.text('Введите пароль (если есть): '),
            phoneCode: async () => await input.text('Введите код из Telegram: '),
            onError: (err) => console.log('Ошибка авторизации:', err),
        });
        console.log('Вы успешно авторизованы!');
        console.log('Сессия:', client.session.save());
    } else {
        await client.connect();
        console.log('Подключение с использованием сохранённой сессии выполнено!');

        await fillUsersHash()
        const me = await client.getEntity("me");

        lordUser = Number(me.id).toString()


    }
}

/**
 * Обработчик обновлений
 */
async function handleUpdate(update) {
    if (update.message || update.className === 'UpdateShortMessage') {
        const message = update.message || '';

        console.log('### update === ', update);
        // console.log('### message === ', message);
        console.log('### update.userId.value === ', update.userId.value);
        const userIdString =  Number(update.userId.value).toString()

        console.log('### userIdString === ', userIdString);

        if(!usersObj[userIdString]){
            await fillUsersHash();
        }

        const userChat = getUserObj({userIdString, usersObj});
        const isOutgoing = update.out;

        if (isOutgoing && userChat) {
            if (message === 'on') {
                aiMode[userIdString] = true;
                await client.deleteMessages(userChat, [update.id], { revoke: true });
                await fillChatHistory({client, userChat, lordUser, userHistory, userIdString});
            }

            if (message === 'off') {
                aiMode[userIdString] = false;
                await client.deleteMessages(userChat, [update.id], { revoke: true });
            }
        }

        if (!isOutgoing && userChat && aiMode[userIdString]) {
            // console.log('++++ username ++++ ', userIdString);
            // if (!userHistory[userIdString]) {
            //     userHistory[userIdString] = [];
            //     userHistory[userIdString].push({ role: "system", content: process.env.AI_ROLE });
            // }
            userHistory[userIdString].push({ role: 'user', content: message });

            //        console.log('userHistory[userIdString] === ', userHistory[userIdString])

            try {

                console.log('userHistory[userIdString] === ', userHistory[userIdString])

                const response = await openai.chat.completions.create({
                    messages: userHistory[userIdString],
                    model: 'gpt-4o',
                });

                const botReply = response.choices[0].message.content;
                console.log('<=== gptResponse', botReply);
                userHistory[userIdString].push({ role: 'assistant', content: botReply });

                await sendTypingEffectAndMessage({client, userIdString, message:botReply, userChat});
                await client.sendMessage(userChat,{message: botReply});
            } catch (error) {
                console.error("Error accessing OpenAI:", error.message);
            }
        }
    }
}

/**
 * Запуск клиента
 */
(async () => {
    await startClient();
    console.log('Клиент запущен, слушаю сообщения...');
    client.addEventHandler(handleUpdate);
})();

/**
 * Заполнение Hash
 */
async function fillUsersHash() {
    const dialogs = await client.getDialogs({ limit: 100 });
    // const users = [];

    // console.log('dialogs === ', dialogs);

    for (const dialog of dialogs) {
        const entity = dialog.entity;
        if (entity instanceof Api.User && !entity.bot) {
            // users.push({
            //     id: entity.id.toString(),
            //     access_hash: entity.accessHash?.toString(),
            //     first_name: entity.firstName || null,
            //     username: entity.username || null,
            // });
            usersObj[entity.id.toString()] = {
                access_hash: entity.accessHash?.toString(),
                first_name: entity.firstName || null,
                username: entity.username || null,
            }
        }
    }
    // console.log(`✅ Saved ${users.length} users to users.json`);
    // console.log('usersObj in', usersObj);
}





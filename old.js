const userHistory = [
    {
        role: 'system',
        content: 'Ты веселый собеседник.\n' +
            'Тебя зовут Андрей. ты ведешь переписку с девушкой.\n' +
            'Ты собирираешься в отпуск в Стамбул в апреле с 14 по 20.\n' +
            'Ты ищешь попутчика в отпуск.\n' +
            'Девушка интересуется твоими планами, и может поехать с тобой.\n' +
            'Будь вежлив, галантен.\n' +
            'Интересуйся личностью опонента, рассказывай истории из своей жизни.\n' +
            'Что ты хочешь посмотреть в Стамбуле и рядом с городом.\n' +
            'Но не надо сразу все рассказывать о своих планах. Пусть сама спросит.\n' +
            'Пиши самую суть вопроса, не размениваясь на детали.\n' +
            'Пиши без вводных слов. Как настоящий ковбой, который ценит все слова что говорит.\n' +
            'Веди себя непринужденно'
    },
    { role: 'user', content: 'как дела' },
    { role: 'assistant', content: 'Отлично! Как у тебя?' },
    { role: 'user', content: 'норм, сам как?' },
    { role: 'assistant', content: 'В полном порядке. Какие новости?' },
    {
        role: 'user',
        content: 'да, все как обычно. Работаю. Что у тебя нового?'
    }
]



const wellness = {
    CONSTRUCTOR_ID: 826001400,
        SUBCLASS_OF_ID: 2331323052,
    className: 'UpdateShortMessage',
    classType: 'constructor',
    flags: 0,
    out: false,
    mentioned: false,
    mediaUnread: false,
    silent: false,
    id: 361,
    userId: Integer { value: 191147894n },
    message: 'hhhhhhhhhhhh',
        pts: 630,
    ptsCount: 1,
    date: 1742421420,
    fwdFrom: null,
    viaBotId: null,
    replyTo: null,
    entities: null,
    ttlPeriod: null
}

const bad =  {
    CONSTRUCTOR_ID: 826001400,
    SUBCLASS_OF_ID: 2331323052,
    className: 'UpdateShortMessage',
    classType: 'constructor',
    flags: 0,
    out: false,
    mentioned: false,
    mediaUnread: false,
    silent: false,
    id: 362,
    userId: Integer { value: 191147894n },
message: 'oooooooooo',
    pts: 631,
    ptsCount: 1,
    date: 1742421582,
    fwdFrom: null,
    viaBotId: null,
    replyTo: null,
    entities: null,
    ttlPeriod: null
}


// Тестовая отправка сообщения
async function testMessage() {
    try {
        const chatId = YOUR_CHAT_ID;
        const inputPeer = myInputPeer;
        // const inputPeer = await getInputPeer(chatId); // Получаем InputPeer
        await client.sendMessage(inputPeer, { message: 'Тестовое сообщение от клиента' });
        console.log(`Тестовое сообщение отправлено в чат ${chatId}`);
    } catch (error) {
        console.error('Ошибка отправки тестового сообщения:', error);
    }
}

let chatId;
if (update.peerId) {
    chatId = update.peerId.userId?.value || update.peerId.chatId?.value || update.peerId.channelId?.value;
} else if (update.userId) {
    chatId = update.userId.value; // Для UpdateShortMessage
}

// const me = await client.getMe();
// console.log('Текущий пользователь:', me.username || me.id, 'me.accessHash', me.accessHash);
//
// // Сохраняем InputPeer для текущего пользователя
// myInputPeer = new Api.InputPeerUser({
//     userId: BigInt(me.id),
//     accessHash: me.accessHash
// });
//
// const chat = await client.getInputEntity(-191147894);
//
// await client.sendMessage(chat, { message: "Привет, это тестовое сообщение!" });
// console.log('chat', chat);
//
// console.log('InputPeer:', myInputPeer);


// const { TelegramClient, Api } = require('telegram');
// const { StringSession } = require('telegram/sessions');
// const { OpenAI } = require('openai');
// const input = require('input');
//
// // Настройки Telegram
// const apiId = '17950739'; // Твой api_id
// const apiHash = 'f64cf6eb08184c417a833b9e53e81c74'; // Твой api_hash
// const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNDEBu52UWHuNpMQfrnsfxQhB5iw1q/P6Hi/zFoQ9/qw7uqMBuEA/pIZDlkbco6PbCRV7ELcg8EY9kMNJuLu2OZ2Mq0BHMKoe1CoFn11ToPKt8BDqYppch1+qJVX/coOrStDmYIf/gUrqYywv23QuGlSvMpkIbHwjfmGLBnXVcGGkTnGxZwv5Z9vUlKKBEnMYx8iOXbvR0APxsOWvfHTzXVyZzgS1sBJ9Q14KMx41kVCCVgazfYu4KM6A77tfKWGmQgZFZb+5qDBSTAGOGk4nqSaXcybJQDenSJPJ4U8W/Hid09sL2XEN6lE+2PjAN6eorPryihWt/Xf8GptcC1qVc/n77g4='); // Твоя сессия
// const YOUR_CHAT_ID = '7194611749';
//
// // Настройки OpenAI
// const openai = new OpenAI({
//     apiKey: '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', // Твой ключ OpenAI
// });
//
// let aiMode = false;
// let chatIdWithAi = null;
//
// const client = new TelegramClient(stringSession, parseInt(apiId), apiHash, {
//     connectionRetries: 5,
//     useWSS: true,
// });
//
// // Функция авторизации
// async function startClient() {
//     if (!stringSession.session) {
//         await client.start({
//             phoneNumber: async () => await input.text('Введите ваш номер телефона: '),
//             password: async () => await input.text('Введите пароль (если есть): '),
//             phoneCode: async () => await input.text('Введите код из Telegram: '),
//             onError: (err) => console.log('Ошибка авторизации:', err),
//         });
//         console.log('Вы успешно авторизованы!');
//         console.log('Сессия:', client.session.save());
//     } else {
//         await client.connect();
//         console.log('Подключение с использованием сохранённой сессии выполнено!');
//     }
//
//     const me = await client.getMe();
//     console.log('Текущий пользователь:', me.username || me.id);
// }
//
// // Обработчик обновлений
// async function handleUpdate(update) {
//     // console.log('Получено обновление:', JSON.stringify(update.message, null, 2));
//
//     // if (update._ === 'updateNewMessage' || update._ === 'updateNewChannelMessage') {
//     if (update.message) {
//
//         console.log('### ', update.message);
//         console.log('*** ', update)
//
//         const message = update.message;
//         // const chatId = message.peerId?.userId || message.peerId?.chatId || message.peerId?.channelId;
//         const text = message || '(без текста)';
//         const isOutgoing = update.out;
//
//         let chatId;
//         if (update.peerId) {
//             chatId = update.peerId.userId?.value || update.peerId.chatId?.value || update.peerId.channelId?.value;
//         } else if (update.userId) {
//             chatId = update.userId.value; // Для UpdateShortMessage
//         }
//
//         if (isOutgoing) {
//             console.log(`[Отправлено] Чат ${chatId}: ${text}`);
//         } else {
//             console.log(`[Получено] Чат ${chatId}: ${text}`);
//         }
//
//         if (isOutgoing) {
//             // if (text === '/ai_on') {
//             //     aiMode = true;
//             //     chatIdWithAi = chatId;
//             //     const reply = 'Режим ИИ включён!';
//             //     console.log(`++++Ai`);
//             //     await client.sendMessage(chatId, { message: reply });
//             //     console.log(`[Отправлено] Чат ${chatId}: ${reply}`);
//             //     return;
//             // }
//
//             if (text === '/ai_on') {
//                 aiMode = true;
//                 chatIdWithAi = chatId;
//                 const reply = 'Режим ИИ включён!';
//                 console.log('++++Ai');
//                 // Создаём InputPeerUser для отправки сообщения
//                 const inputPeer = new Api.InputPeerUser({
//                     userId: chatId,
//                     accessHash: 0n // accessHash неизвестен, но для личных чатов часто работает и без него
//                 });
//                 await client.sendMessage(inputPeer, { message: reply });
//                 console.log(`[Отправлено] Чат ${chatId}: ${reply}`);
//                 return;
//             }
//
//             if (text === '/ai_off') {
//                 aiMode = false;
//                 chatIdWithAi = null;
//                 const reply = 'Режим ИИ выключен.';
//                 await client.sendMessage(chatId, { message: reply });
//                 console.log(`[Отправлено] Чат ${chatId}: ${reply}`);
//                 return;
//             }
//
//             if (aiMode && chatId && chatId.toString() === chatIdWithAi?.toString() && !text.startsWith('/')) {
//                 try {
//                     const response = await openai.chat.completions.create({
//                         model: 'gpt-3.5-turbo',
//                         messages: [{ role: 'user', content: text }],
//                         max_tokens: 150,
//                     });
//                     const aiReply = response.choices[0].message.content;
//                     await client.sendMessage(chatId, { message: aiReply });
//                     console.log(`[Отправлено] Чат ${chatId}: ${aiReply} (от ИИ)`);
//                 } catch (error) {
//                     console.error('Ошибка OpenAI:', error);
//                     const errorReply = 'Ошибка с ИИ.';
//                     await client.sendMessage(chatId, { message: errorReply });
//                     console.log(`[Отправлено] Чат ${chatId}: ${errorReply}`);
//                 }
//             }
//         } else {
//             console.log('Получено обновление другого типа:', update._ || 'неизвестный тип');
//         }
//     }
// }
//
// // Тестовая отправка сообщения
// async function testMessage() {
//     try {
//         const chatId = YOUR_CHAT_ID; // Замени на свой ID или ID чата
//         await client.sendMessage(chatId, { message: 'Тестовое сообщение от клиента' });
//         console.log(`Тестовое сообщение отправлено в чат ${chatId}`);
//     } catch (error) {
//         console.error('Ошибка отправки тестового сообщения:', error);
//     }
// }
//
// // Запуск клиента
// (async () => {
//     console.log('Запускаю клиент...');
//     await startClient();
//     console.log('Клиент запущен, слушаю сообщения...');
//
//     // Подписываемся на обновления
//     client.addEventHandler(handleUpdate);
//
//     // Отправляем тестовое сообщение
//     await testMessage();
// })();




/*
const { TelegramClient } = require('telegram');
const { StringSession } = require('telegram/sessions');
const { OpenAI } = require('openai');
const input = require('input'); // Для ввода номера и кода авторизации

// Настройки Telegram
const apiId = '17950739'; // Твой api_id
const apiHash = 'f64cf6eb08184c417a833b9e53e81c74'; // Твой api_hash


const stringSession = new StringSession('1AgAOMTQ5LjE1NC4xNjcuNDEBu52UWHuNpMQfrnsfxQhB5iw1q/P6Hi/zFoQ9/qw7uqMBuEA/pIZDlkbco6PbCRV7ELcg8EY9kMNJuLu2OZ2Mq0BHMKoe1CoFn11ToPKt8BDqYppch1+qJVX/coOrStDmYIf/gUrqYywv23QuGlSvMpkIbHwjfmGLBnXVcGGkTnGxZwv5Z9vUlKKBEnMYx8iOXbvR0APxsOWvfHTzXVyZzgS1sBJ9Q14KMx41kVCCVgazfYu4KM6A77tfKWGmQgZFZb+5qDBSTAGOGk4nqSaXcybJQDenSJPJ4U8W/Hid09sL2XEN6lE+2PjAN6eorPryihWt/Xf8GptcC1qVc/n77g4='); // Сессия сохраняется после первого входа

// Настройки OpenAI
const openai = new OpenAI({
    apiKey: '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', // Твой ключ OpenAI
});

// Глобальная переменная для режима ИИ
let aiMode = false;
let chatIdWithAi = null; // Хранит ID чата, где включён ИИ

// Создаём клиент
const client = new TelegramClient(stringSession, parseInt(apiId), apiHash, {
    connectionRetries: 5,
});

// Функция авторизации
async function startClient() {
    await client.start({
        phoneNumber: async () => await input.text('Введите ваш номер телефона: '),
        password: async () => await input.text('Введите пароль (если есть): '),
        phoneCode: async () => await input.text('Введите код из Telegram: '),
        onError: (err) => console.log(err),
    });
    console.log('Вы успешно авторизованы!');
    console.log('Сессия:', client.session.save()); // Сохрани это для повторного использования
}

// Обработка сообщений
client.on('update', async (update) => {
    console.log('Получено обновление:', JSON.stringify(update, null, 2)); // Логируем все

    if (update.className === 'UpdateNewMessage' && update.message.out === false) {
        const message = update.message;
        const chatId = message.chatId;
        const text = message.message;
        const isOutgoing = message.out; // true, если сообщение исходящее

        // Логируем все сообщения
        if (isOutgoing) {
            console.log(`[Отправлено] Чат ${chatId}: ${text}`);
        } else {
            console.log(`[Получено] Чат ${chatId}: ${text}`);
        }

        // Команда для включения ИИ
        if (text === '/ai_on') {
            aiMode = true;
            chatIdWithAi = chatId;
            await client.sendMessage(chatId, { message: 'Режим ИИ включён. Теперь я буду отвечать за вас!' });
            console.log(`[Отправлено] Чат ${chatId}: Режим ИИ включён. Теперь я буду отвечать за вас!`);
            return;
        }

        // Команда для выключения ИИ
        if (text === '/ai_off') {
            aiMode = false;
            chatIdWithAi = null;
            await client.sendMessage(chatId, { message: 'Режим ИИ выключен.' });
            console.log(`[Отправлено] Чат ${chatId}: Режим ИИ выключен.`);
            return;
        }

        // Если ИИ включён и сообщение из того же чата
        if (aiMode && chatId.equals(chatIdWithAi) && !text.startsWith('/')) {
            try {
                const response = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo', // Или 'gpt-4', если у тебя есть доступ
                    messages: [{ role: 'user', content: text }],
                    max_tokens: 150,
                });
                const aiReply = response.choices[0].message.content;
                await client.sendMessage(chatId, { message: aiReply });
                console.log(`[Отправлено] Чат ${chatId}: ${aiReply} (от ИИ)`);
            } catch (error) {
                console.error('Ошибка OpenAI:', error);
                await client.sendMessage(chatId, { message: 'Извините, что-то пошло не так с ИИ.' });
            }
        }
    }
});

// Запуск клиента
(async () => {
    console.log('Запускаю клиент...');
    await startClient();
    console.log('Клиент запущен, слушаю сообщения...');
})();*/



// const inputPeer = await getInputPeer(chatId); // Получаем InputPeer перед отправкой

// let inputPeer = myInputPeer;
// try {
//     inputPeer = await getInputPeer(chatId); // Пробуем получить InputPeer для chatId
// } catch (error) {
//     console.log('Не удалось получить InputPeer, используем свой ID:', error.message);
//     inputPeer = myInputPeer; // Если не удалось, используем свой ID
// }


// Функция получения InputPeer
// async function getInputPeer(chatId) {
//     try {
//         // Преобразуем BigInt в строку
//         const stringChatId = chatId.toString();
//         const entity = await client.getEntity(stringChatId); // Передаём строку напрямую
//         return new Api.InputPeerUser({
//             userId: BigInt(stringChatId), // Обратно в BigInt для InputPeerUser
//             accessHash: entity.accessHash
//         });
//     } catch (error) {
//         console.error('Ошибка получения InputPeer:', error);
//         throw error;
//     }
// }


// (async () => {
//     console.log("Loading interactive example...");
//     const client = new TelegramClient(stringSession, apiId, apiHash, {
//         connectionRetries: 5,
//     });
//     await client.start({
//         phoneNumber: async () => await input.text("Please enter your number: "),
//         password: async () => await input.text("Please enter your password: "),
//         phoneCode: async () =>
//             await input.text("Please enter the code you received: "),
//         onError: (err) => console.log(err),
//     });
//     console.log("You should now be connected.");
//     console.log(client.session.save()); // Save this string to avoid logging in again
//     await client.sendMessage("me", { message: "Hello! Nef" });
// })();


// if (await client.checkAuthorization()){
//     console.log("I am logged in!");
// }else{
//     console.log("I am connected to telegram servers but not logged in with any account/bot");
// }

// Сохраняем InputPeer для текущего пользователя
// myInputPeer = new Api.InputPeerUser({
//     userId: BigInt(me.id),
//     accessHash: me.accessHash
// });

// const chat = await client.getInputEntity(-191147894);
// const chat = await client.getInputEntity(191147894);


// console.log('chat', chat);

// console.log('userHistory[userIdString] === ', userHistory);
// return;

// const messages = await client.getMessages(userChat, { limit: 20 }); // последние 20 сообщений
// for (const msg of messages) {
//     if (msg instanceof Api.Message && msg.message) {
//         const from = msg.fromId instanceof Api.PeerUser ? `User ${msg.fromId.userId}` : "Unknown";
//         const role = Number(msg.fromId?.userId).toString() === lordUser ? 'assistant' : 'user'
//         historyArr.unshift({role, content: msg.message})
//     }
// }

// const dialogs = await client.getDialogs({ limit: 100 });
// console.log('messages == ', messages);
// console.log(`[${msg.date}] ${from}: ${msg.message}`);
// console.log('Number(msg.fromId?.userId).toString()', Number(msg.fromId?.userId).toString())
// console.log('lordUser', lordUser)
// console.log('===', Number(msg.fromId?.userId).toString() === lordUser)

// console.log('historyArr === ', historyArr);

// userHistory[userIdString] = [];
// userHistory[userIdString].push({ role: "system", content: process.env.AI_ROLE });
// userHistory[userIdString].push(...historyArr);

// console.log('userHistory[userIdString] === ', userHistory[userIdString]);

// for (const dialog of dialogs) {
//     const entity = dialog.entity;
//
//     if (entity instanceof Api.User && !entity.bot) {
//         console.log(`👤 ${entity.firstName} (${entity.username || "no username"}) [id: ${entity.id}]`);
//     }
// }

// let username;
// try {
//     // const user = await client.getInputEntity(update.userId.value);
//     // console.log('### user === ', user);
//     // username = user.username || user.id.toString();
//     const user = await client.getEntity(update.userId.value);
//     username = user.username
// } catch (err) {
//     console.error('Ошибка получения username:', err);
//     return
// }

// const me = await client.getMe();
// console.log('Текущий пользователь:', me.username || me.id, 'me.accessHash', me.accessHash);

// const inputUser = getUserObj({userIdString: '191147894', usersObj});
// console.log('inputUser', inputUser);
// const messages = await client.getMessages(inputUser, { limit: 20 });
// for (const msg of messages) {
//     if (msg instanceof Api.Message && msg.message) {
//         console.log(`[${msg.date}] ${msg.message}`);
//     }
// }

// const geUserObj = (userIdString, usersObj) => {
//     const userId = BigInt(userIdString);
//     const accessHash = BigInt(usersObj[userIdString].access_hash);
//
//     const inputUser = new Api.InputPeerUser({
//         userId,
//         accessHash,
//     });
// }


// async function sendTypingEffectAndMessage({client, username, message}) {
//     try {
//         await client.invoke(new Api.messages.SetTyping({
//             peer: username,
//             action: new Api.SendMessageTypingAction()
//         }));
//         const typingSpeed = 50;
//         const maxDelay = 7000;
//         let delay = message.length * typingSpeed;
//         if (delay > maxDelay) {
//             delay = maxDelay;
//         }
//         await new Promise(resolve => setTimeout(resolve, delay));
//     } catch (error) {
//         console.error("Ошибка при отправке сообщения:", error);
//     }
// }

/*async function sendTypingEffectAndMessage({client, username, message, userChat}) {
    try {
        await client.invoke(new Api.messages.SetTyping({
            peer: userChat,
            action: new Api.SendMessageTypingAction()
        }));
        const typingSpeed = 50;
        const maxDelay = 7000;
        let delay = message.length * typingSpeed;
        if (delay > maxDelay) {
            delay = maxDelay;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    } catch (error) {
        console.error("Ошибка при отправке сообщения:", error);
    }
}*/

// console.log('me === ', lordUser);


// fs.writeFileSync("users.json", JSON.stringify(users, null, 2), "utf8");

// console.log('usersObj out', usersObj);




// await client.sendMessage(inputUser,{message:"3 Привет, это тестовое сообщение!"});
// await client.sendMessage("me",{message:"1 Привет, это тестовое сообщение!"});
// await client.sendMessage("@ded_ot_moroz",{message:"1 Привет, это тестовое сообщение!"});
// const username = await input.text("имя"); // без @
// const entity = await client.getEntity(username);
//
// const dialogs = await client.getDialogs({ limit: 100 });
//
// const messages = await client.getMessages(entity, { limit: 20 }); // последние 20 сообщений

// for (const msg of messages) {
//     if (msg instanceof Api.Message && msg.message) {
//         const from = msg.fromId instanceof Api.PeerUser ? `User ${msg.fromId.userId}` : "Unknown";
//         console.log(`[${msg.date}] ${from}: ${msg.message}`);
//     }
// }

// for (const dialog of dialogs) {
//     const entity = dialog.entity;
//
//     if (entity instanceof Api.User && !entity.bot) {
//         console.log(`👤 ${entity.firstName} (${entity.username || "no username"}) [id: ${entity.id}]`);
//     }
// }
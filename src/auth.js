import input from 'input';
import { lordUser } from './store';
import {
    fillUsersHash,
} from './helpers';

/**
 * Authorization
 */
export async function startClient(stringSession) {
    const client = lordUser.telegramClient;
    if (!stringSession) {
        await client.start({
            phoneNumber: async () => await input.text('Enter your phone number: '),
            password: async () => await input.text('Enter your password (if any): '),
            phoneCode: async () => await input.text('Enter the code from Telegram: '),
            onError: (err) => console.log('Authorization error:', err),
        });
        console.log('You have successfully logged in!');
        console.log('Session:', client.session.save());
    } else {
        await client.connect();
        console.log('Connection using the saved session is completed!');
        await fillUsersHash(client)
        const me = await client.getEntity("me");
        lordUser.id = Number(me.id).toString()
    }
}
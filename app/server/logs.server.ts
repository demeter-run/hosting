import { mockApiCall } from '~/helpers/misc';
import { Log, Provider } from '~/helpers/types';

type PageTypes = {
    enabledProviders: Provider[];
    logs: Log[];
};

export async function getPageData(): Promise<PageTypes> {
    await mockApiCall();
    return {
        enabledProviders: [
            {
                id: 1,
                name: 'TxPipe',
                location: 'US Central',
                logo: '/assets/logos/txpipe.svg',
                features: [
                    'Cardano Node',
                    'DB-Sync',
                    'Webhooks',
                    'Ogmios',
                    'Kupo',
                    'Submit Api',
                    'Blockfrost RYO',
                    'Kuber',
                    'Marlowe Runtime',
                    'GraphQL',
                    'UTxO RPC',
                ],
                supportLink: 'https://discord.gg/ZTHcHUy5HY',
                isEnabled: true,
            },
            {
                id: 2,
                name: 'Blink Labs',
                location: 'US Central',
                logo: '/assets/logos/blink-labs.svg',
                features: ['Cardano Node', 'DB-Sync', 'Ogmios', 'Kupo', 'Blockfrost RYO'],
                isEnabled: false,
            },
        ],
        logs: [
            {
                timestamp: '2024-03-14T13:54:42.338827319Z',
                msg: 'HEAD /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms',
                provider: 'TxPipe',
            },
            {
                timestamp: '2024-03-14T13:55:40.707799067Z',
                msg: 'HEAD /backups/www.rar 404 - - 1.142 ms',
                provider: 'Blink Labs',
            },
            {
                timestamp: '2024-03-14T13:56:12.242978036Z',
                msg: 'HEAD /old/config.js 404 - - 2.140 ms',
                provider: 'TxPipe',
            },
            {
                timestamp: '2024-03-14T14:01:13.159746374Z',
                msg: 'HEAD /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms /backups/directory.zip 404 - - 1.080 ms',
                provider: 'TxPipe',
            },
            {
                timestamp: '2024-03-14T14:05:28.585610352Z',
                msg: '2024-03-14T14:05:28.585610352Z HEAD /restore/.env 404 - - 1.762 ms',
                provider: 'Blink Labs',
            },
            {
                timestamp: '2024-03-14T14:06:26.362239326Z',
                msg: '2024-03-14T14:06:26.362239326Z GET /robots.txt 404 - - 1.105 ms',
                provider: 'TxPipe',
            },
            {
                timestamp: '2024-03-14T14:08:59.375340025Z',
                msg: '2024-03-14T14:08:59.375340025Z HEAD /back/public_html.zip 404 - - 1.256 ms',
                provider: 'Blink Labs',
            },
            {
                timestamp: '2024-03-14T14:13:01.289019831Z',
                msg: 'HEAD /restore/bak.rar 404 - - 1.213 ms',
                provider: 'TxPipe',
            },
            {
                timestamp: '2024-03-14T14:13:14.321920362Z',
                msg: 'HEAD /restore/Archive.zip 404 - - 2.287 ms',
                provider: 'Blink Labs',
            },
            {
                timestamp: '2024-03-14T14:15:01.709886876Z',
                msg: 'HEAD /back/index.zip 404 - - 1.080 ms',
                provider: 'TxPipe',
            },
        ],
    };
}

import { mockApiCall } from '~/helpers/misc';
import { ActivityItem, Provider } from '~/helpers/types';

type PageTypes = {
    enabledProviders: Provider[];
    activity: ActivityItem[];
};

// TODO: Define if we need a separate id or we can use the timestamp as id

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
        activity: [
            {
                id: 1,
                timestamp: 1642345200000,
                requests: 4567,
                dcus: 3450467,
                provider: 'TxPipe',
            },
            {
                id: 2,
                timestamp: 1642431600000,
                requests: 10234,
                dcus: 12367364,
                provider: 'Blink Labs',
            },
            {
                id: 3,
                timestamp: 1642518000000,
                requests: 12489,
                dcus: 14367364,
                provider: 'TxPipe',
            },
            {
                id: 4,
                timestamp: 1642604400000,
                requests: 3409,
                dcus: 4450467,
                provider: 'Blink Labs',
            },
            {
                id: 5,
                timestamp: 1642690800000,
                requests: 7456,
                dcus: 3450467,
                provider: 'TxPipe',
            },
            {
                id: 6,
                timestamp: 1642777200000,
                requests: 2367,
                dcus: 12367364,
                provider: 'Blink Labs',
            },
            {
                id: 7,
                timestamp: 1642863600000,
                requests: 5683,
                dcus: 14367364,
                provider: 'TxPipe',
            },
            {
                id: 8,
                timestamp: 1642950000000,
                requests: 9234,
                dcus: 4450467,
                provider: 'Blink Labs',
            },
            {
                id: 9,
                timestamp: 1643036400000,
                requests: 12345,
                dcus: 4450467,
                provider: 'TxPipe',
            },
        ],
    };
}

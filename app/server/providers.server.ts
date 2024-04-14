import { mockApiCall } from '~/helpers/misc';
import { Provider } from '~/helpers/types';

type PageTypes = {
    providers: Provider[];
};

export async function getPageData(): Promise<PageTypes> {
    await mockApiCall();
    return {
        providers: [
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
    };
}

export async function handlePageAction(data: FormData) {
    const intent = data.get('intent') as string;
    // If checked is true, enable provider, if false, disable provider
    const checked = data.get('checked') as string;
    const providerId = data.get('providerId') as string;
    console.log(providerId);
    console.log(checked);
    switch (intent) {
        case 'update_provider_status':
            await mockApiCall();
            // When the promise is resolved the loader will re-run and the UI will update
            return null;
        default:
            return null;
    }
}

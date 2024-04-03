export type Provider = {
    id: number;
    name: string;
    location: string;
    logo: string;
    features?: string[];
};

export function getProviders(): Promise<Provider[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
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
                },
                {
                    id: 2,
                    name: 'Blink Labs',
                    location: 'US Central',
                    logo: '/assets/logos/blink-labs.svg',
                    features: ['Cardano Node', 'DB-Sync', 'Ogmios', 'Kupo', 'Blockfrost RYO'],
                },
            ]);
        }, 1000);
    });
}

import { mockApiCall } from '~/helpers/misc';

type Ledger = {
    id: number;
    timestamp: string | number;
    provider?: string;
    dcus: number;
    requests?: number;
    hash: string;
    type: string;
};

// TODO: Define if we need a separate id or we can use the transaction hash

export async function getLedger(): Promise<Ledger[]> {
    await mockApiCall();
    return [
        {
            id: 1,
            timestamp: 1642345260000,
            dcus: 3450467,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
            type: 'topup',
        },
        {
            id: 2,
            timestamp: 1642518000000,
            provider: 'Blink Labs',
            requests: 10234,
            dcus: 12367364,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
            type: 'charge',
        },
        {
            id: 2,
            timestamp: 1642518000000,
            provider: 'TxPipe',
            requests: 10234,
            dcus: 12367364,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
            type: 'charge',
        },
    ];
}

export async function getBalance(): Promise<number> {
    await mockApiCall();
    return 1000000;
}

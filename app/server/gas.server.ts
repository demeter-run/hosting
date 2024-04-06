import { mockApiCall } from '~/helpers/misc';

type Ledger = {
    id: number;
    from: string | number;
    to: string | number;
    provider: string;
    dcus: number;
    requests: number;
    hash: string;
};

// TODO: Define if we need a separate id or we can use the transaction hash

export async function getLedger(): Promise<Ledger[]> {
    await mockApiCall();
    return [
        {
            id: 1,
            from: 1642345260000,
            to: 1642431600000,
            provider: 'TxPipe',
            requests: 4567,
            dcus: 3450467,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
        },
        {
            id: 2,
            from: 1642431660000,
            to: 1642518000000,
            provider: 'TxPipe',
            requests: 10234,
            dcus: 12367364,
            hash: 'f4767f352e8c6985c5da055b98dfb8f4cf456830acc809fc7ffc8676c2175e95',
        },
    ];
}

export async function getBalance(): Promise<number> {
    await mockApiCall();
    return 1000000;
}
